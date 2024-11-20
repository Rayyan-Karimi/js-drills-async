import fs from 'fs/promises'

// All new files' names are stored in here
const filenamesFile = 'filenames.txt';
const inputFile = '../lipsum.txt';


// 1. Read loren ipsum file, convert to uppercase
export async function readFilenames() {
    return fs.readFile(inputFile, 'utf8')
        .then(async data => writeUpperCaseFile(data))
        .catch((err) => console.error('Error in step 1.'));
}


// 2. Convert uppercase to lowercase, split into sentences, save in new file.
export async function writeLowerCaseFile() {
    return fs.readFile('uppercase.txt', 'utf8')
        .then(async data => writeLoweredSentencesAndSave(data))
        .catch((err) => console.error('Error in step 2.'));
}


// 3. Sort the content of the lowercase file and write to a new file
export async function sortAndWrite() {
    return fs.readFile('lowercase.txt', 'utf8')
        .then(async data => writeSortedFile(data))
        .catch((err) => console.error('Error in step 3.'));
}


//  4. Read filenames.txt and delete all files listed there.
export async function deleteFiles() {
    return fs.readFile(filenamesFile, 'utf8')
        .then(async data => deleteFilesListed(data))
        .catch((err) => console.error('Error in step 4.'));
}


/**
 * Helper functions
 */
async function deleteFilesListed(data) {
    const files = data.trim().split('\n');
    const deletePromises = files.map((file) => fs.unlink(file));
    return Promise.all(deletePromises)
        .then(() => {
            console.log("All files deleted.");
            return fs.unlink(filenamesFile);
        })
}
async function writeSortedFile(data) {
    const sortedFile = 'sorted.txt';
    const sortedData = data.split('\n').sort().join('\n');
    return fs.writeFile(sortedFile, sortedData)
        .then(() => {
            console.log("Sorted file created.");
            return fs.appendFile(filenamesFile, sortedFile + "\n");
        });
}
async function writeLoweredSentencesAndSave(data) {
    const lowerCaseFile = 'lowercase.txt';
    const loweredSentences = data.toLowerCase().split('.').map((sentence) => sentence.trim()).join('.\n');
    return fs.writeFile(lowerCaseFile, loweredSentences)
        .then(() => {
            console.log("Lowercase sentences file created.");
            return fs.appendFile(filenamesFile, `${lowerCaseFile}\n`);
        })
}
async function writeUpperCaseFile(data) {
    const upperCaseFile = 'uppercase.txt';
    await fs.writeFile(upperCaseFile, data.toUpperCase());
    console.log("Uppercase file created.");
    return await fs.appendFile(filenamesFile, `${upperCaseFile}\n`);
}


