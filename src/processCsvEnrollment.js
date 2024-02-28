import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import dotenv from 'dotenv'
dotenv.config()

const aggregatedEnrolled = {};

export const writeDataToFile = (data, insuranceCompany, outputFolder) => {
    try {
        const fileName = `${insuranceCompany.replace(/\s+/g, '_')}.csv`;
        const filePath = path.join(outputFolder, fileName);

        const sortedData = data.sort((a, b) => {
            if (a.lastName === b.lastName) {
                return a.firstName.localeCompare(b.firstName);
            }
            return a.lastName.localeCompare(b.lastName);
        });

        const header = 'User Id,First and Last Name,Version,Insurance Company\n';
        const fileContent = sortedData.reduce((acc, cur) => {
            return acc + `${cur.userId},${cur.firstName} ${cur.lastName},${cur.version},${cur.insuranceCompany}\n`;
        }, header);

        fs.writeFileSync(filePath, fileContent);
    } catch (error) {
        console.error(`Error writing data to file for insurance company ${insuranceCompany}: ${error.message}`);
    }
};

export const processFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser({
                mapHeaders: ({ header }) => header.trim(),
                mapValues: ({ value }) => value.trim(),
            }))
            .on('data', (row) => {
                if (row.userId && row.firstNameLastName && parseInt(row.version) && row.insuranceCompany) {
                    const userId = row.userId;
                    const [firstName, lastName] = row.firstNameLastName.split(' ');
                    const version = parseInt(row.version);
                    const insuranceCompany = row.insuranceCompany;

                    if (!aggregatedEnrolled[insuranceCompany]) {
                        aggregatedEnrolled[insuranceCompany] = {};
                    }

                    if (!aggregatedEnrolled[insuranceCompany][userId] || aggregatedEnrolled[insuranceCompany][userId].version < version) {
                        aggregatedEnrolled[insuranceCompany][userId] = { userId, firstName, lastName, version, insuranceCompany };
                    }
                } else {
                    console.log("Record missing information: ", row, filePath);
                }
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(`Error processing file ${filePath}: ${error.message}`);
            });
    });
};

export const processAllFiles = async (inputFolder, outputFolder) => {
    try {
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }

        const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.csv'));
        for (const file of files) {
            await processFile(path.join(inputFolder, file));
        }

        // After all files have been processed, write aggregated data to files
        Object.keys(aggregatedEnrolled).forEach(insuranceCompany => {
            const data = Object.values(aggregatedEnrolled[insuranceCompany]);
            writeDataToFile(data, insuranceCompany, outputFolder);
        });

        console.log(`Processing complete for all files.`);
    } catch (error) {
        console.error(`Error processing files: ${error.message}`);
    }
};

// cant use async/await on top level executions
processAllFiles(process.env.INPUT_FOLDER, process.env.OUTPUT_FOLDER).catch((error) => console.log(error));
