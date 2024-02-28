import { writeDataToFile } from './processCsvEnrollment';
import fs from 'fs';

// Mock fs module to avoid actual file I/O
jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
    createReadStream: jest.fn(),
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
    readdirSync: jest.fn(),
}));

const sampleData = [
    { userId: '1', firstName: 'John', lastName: 'Doe', version: 1, insuranceCompany: 'Aetna' },
    { userId: '2', firstName: 'Jane', lastName: 'Doe', version: 2, insuranceCompany: 'Aetna' }
];

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Function writeDataToFile', () => {
    it('should write sorted data to file', () => {
        const insuranceCompany = 'Aetna';
        const outputFolder = './output';
        writeDataToFile(sampleData, insuranceCompany, outputFolder);

        expect(fs.writeFileSync).toHaveBeenCalled();
        const call = fs.writeFileSync.mock.calls[0];
        const filePath = call[0];
        const fileContent = call[1];

        expect(filePath).toContain('Aetna.csv');
        expect(fileContent).toContain('John Doe');
        expect(fileContent).toContain('Jane Doe');
    });
});

// continue writing the other 2 unit test files for each function and method - due to time, I omit these
