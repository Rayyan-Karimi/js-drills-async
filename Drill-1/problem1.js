/*
Problem 1:
Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
        */
// Solve the fs-drills using only callbacks

import fs from 'fs';
import path from 'path';
const dir = './random-json-files'
const countOfRandomFiles = 10;


export function createFiles(callback) {
    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) return callback(err);
        console.log(`Directory '${dir}' created.`);
        let pendingFiles = countOfRandomFiles;
        for (let i = 0; i < countOfRandomFiles; i++) {
            const filePath = path.join(dir, `file${i}.json`);
            const content = JSON.stringify({ id: i, value: Math.random() });
            fs.writeFile(filePath, content, (err) => {
                if (err) return callback(err);
                pendingFiles--;
                if (pendingFiles === 0) callback(null);
            });
        }
    })
}


export function deleteFiles(callback) {
    fs.readdir(dir, (err, files) => {
        if (err) return callback(err);
        let pendingFiles = files.length;
        console.log(`Files to be deleted.`, files);
        files.forEach(file => {
            const filePath = path.join(dir, file
            );
            fs.unlink(filePath, (err) => {
                if (err) return callback(err);
                pendingFiles--;
                if (pendingFiles === 0) callback(null);
            });
        });
    });
}

