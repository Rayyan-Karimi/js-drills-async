import { writeFile, readFile, deleteFile, appendFile } from './promisesPolyfills.js'

const filenamesFile = 'filenames.txt';
const inputFile = '../lipsum.txt';


export async function readFilenames() {
    return readFile(inputFile, 'utf8')
        .then(async data => writeUpperCaseFile(data))
        .catch((err) => console.error('Error in step 1.'));
}

export async function writeLowerCaseFile() {
    return readFile('uppercase.txt', 'utf8')
        .then(async data => writeLoweredSentencesAndSave(data))
        .catch((err) => console.error('Error in step 2.'));
}

export async function sortAndWrite() {
    return readFile('lowercase.txt', 'utf8')
        .then(async data => writeSortedFile(data))
        .catch((err) => console.error('Error in step 3.'));
}

export async function deleteFiles() {
    return readFile(filenamesFile, 'utf8')
        .then(async data => deleteFilesListed(data))
        .catch((err) => console.error('Error in step 4.'));
}


/**
 * Helper functions
 */
async function deleteFilesListed(data) {
    const files = data.trim().split('\n');
    const deletePromises = files.map((file) => deleteFile(file));
    return Promise.all(deletePromises)
        .then(() => {
            console.log("All files deleted.");
            return deleteFile(filenamesFile);
        })
}
async function writeSortedFile(data) {
    const sortedFile = 'sorted.txt';
    const sortedData = data.split('\n').sort().join('\n');
    return writeFile(sortedFile, sortedData)
        .then(() => {
            console.log("Sorted file created.");
            return appendFile(filenamesFile, sortedFile + "\n");
        });
}
async function writeLoweredSentencesAndSave(data) {
    const lowerCaseFile = 'lowercase.txt';
    const loweredSentences = data.toLowerCase().split('.').map((sentence) => sentence.trim()).join('.\n');
    return writeFile(lowerCaseFile, loweredSentences)
        .then(() => {
            console.log("Lowercase sentences file created.");
            return appendFile(filenamesFile, `${lowerCaseFile}\n`);
        })
}
async function writeUpperCaseFile(data) {
    const upperCaseFile = 'uppercase.txt';
    await writeFile(upperCaseFile, data.toUpperCase());
    console.log("Uppercase file created.");
    return await appendFile(filenamesFile, `${upperCaseFile}\n`);
}


