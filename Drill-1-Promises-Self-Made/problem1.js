import path from 'path';
import { makeDir, writeFile, readDir, deleteFile } from './promisesPolyfills.js'

const dir = './random-json-files'
const fileCount = 5;


/**
 * Main functions
 */
export async function createFiles() {
    return makeDir(dir)
        .then(makeFilePromises())
        .then(() => console.log('All files created.'))
        .catch((err) => console.error('Error creating files:', err));
}

export async function deleteFiles() {
    return readDir(dir)
        .then((files) => makeDeletePromises(files))
        .then(() => console.log('All files deleted.'))
        .catch((err) => console.error('Error deleting files:', err));
}


/**
 * Helper functions
 */
function makeFilePromises() {
    console.log(`Directory '${dir}' created.`);
    const filePromises = [];
    for (let i = 0; i < fileCount; i++) {
        const filePath = path.join(dir, `file${i}.json`);
        const content = JSON.stringify({ id: i, value: Math.random() })
        const promise = writeFile(filePath, content)
        filePromises.push(promise);
    }
    return Promise.all(filePromises);
}

function makeDeletePromises(files) {
    if (files.length === 0) {
        console.log("No files to delete.");
        return;
    }
    console.log("Files to be deleteed:", files)
    const deletePromises = files.map((file) => {
        const filePath = path.join(dir, file);
        return deleteFile(filePath);
    });
    return Promise.all(deletePromises);
}
