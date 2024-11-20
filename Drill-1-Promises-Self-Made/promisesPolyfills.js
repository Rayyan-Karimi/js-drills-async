import fs from 'fs';
/**
 * Utility functions - wrapping fs functions in promises 
 */
export function makeDir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}
export function writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}

export function readDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        })
    })
}

export function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}
export function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
export function appendFile(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, content, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}