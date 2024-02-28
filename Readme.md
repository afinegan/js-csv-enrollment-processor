# CSV Enrollment File Processor

This project is a JavaScript application for processing csv type enrollment files. These files are CSV format. The program separates enrollees by insurance company into individual files, sorts the contents of each file by last and first name in ascending order, and handles duplicate User IDs by including only the record with the highest version.

## Features

- Reads CSV enrollment files.
- Separates enrollees by insurance company into individual files.
- Sorts enrollees within each insurance company file by last and first name.
- Handles duplicate User IDs, retaining only the record with the highest version.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/afinegan/js-csv-enrollment-processor.git
    ```

2. Navigate to the project directory:

    ```
    cd js-csv-enrollment-processor
    ```

3. Install dependencies:

    ```
    npm install
    ```

## Usage

1. Ensure you have your CSV enrollment files ready, place them into the data/input directory.
2. Run the program, providing the CSV file(s) as input:

    ```
    npm start
    ```

3. The processed files will be generated in the /data/output directory, separated by insurance company and sorted by last and first name.

## Example

Consider an input CSV file `enrollments.csv` with the following content:
```
User Id,First Name Last Name,Version,Insurance Company
1,John Doe,1,Company A
2,Jane Smith,1,Company B
3,Mike Johnson,1,Company A
4,Alice Williams,2,Company B
5,Robert Brown,1,Company A
6,Emily Davis,1,Company C
7,James Miller,1,Company A
8,Emma Wilson,1,Company C
9,William Jones,1,Company A
10,Olivia Taylor,1,Company B
11,Michael Anderson,1,Company A
12,Elizabeth Martinez,1,Company C
13,David Hernandez,1,Company A
```

After running the program, the output would be:

#### Company_A.csv
```
User Id,First Name Last Name,Version,Insurance Company
11,Michael Anderson,1,Company A
5,Robert Brown,1,Company A
1,John Doe,1,Company A
13,David Hernandez,1,Company A
3,Mike Johnson,1,Company A
9,William Jones,1,Company A
7,James Miller,1,Company A
```

#### Company_B.csv
```
User Id,First Name Last Name,Version,Insurance Company
2,Jane Smith,1,Company B
10,Olivia Taylor,1,Company B
4,Alice Williams,2,Company B
```

#### Company_C.csv
```
User Id,First Name Last Name,Version,Insurance Company
6,Emily Davis,1,Company C
12,Elizabeth Martinez,1,Company C
8,Emma Wilson,1,Company C
```

### Running Tests
To run the unit tests to ensure the program works as expected:
```
npm test
```

## Development

This project is set up using Node.js and Jest for unit testing. The source code is located in the `src` directory, and tests are located with each file (quick check to make sure you have covered all tests). Contributions to extend functionality or improve the code are welcome.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
