import fs from 'fs/promises';
import path from 'path';


const dir = './random-json-files'
const fileCount = 5;


function makeFilePromises() {
    console.log(`Directory '${dir}' created.`);
    const filePromises = [];
    for (let i = 0; i < fileCount; i++) {
        const filePath = path.join(dir, `file${i}.json`);
        const content = JSON.stringify({ id: i, value: Math.random() })
        const promise = fs.writeFile(filePath, content)
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
        fs.unlink(filePath);
    });
    return Promise.all(deletePromises);
}


export async function createFiles() {
    return fs.mkdir(dir, { recursive: true })
        .then(makeFilePromises())
        .then(() => console.log('All files created.'))
        .catch((err) => console.error('Error creating files:', err));
}

export async function deleteFiles() {
    return fs.readdir(dir)
        .then((files) => makeDeletePromises(files))
        .then(() => console.log('All files deleted.'))
        .catch((err) => console.error('Error deleting files:', err));
}

