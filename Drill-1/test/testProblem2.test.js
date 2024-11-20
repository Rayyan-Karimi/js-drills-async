/*
    Using callbacks and the fs module's asynchronous functions, do the following:
*/
// Solve the fs-drills using only callbacks
import fs from 'fs';
import path from 'path';

const lipsumFilePath = './lipsum.txt';
const filenamesFilePath = './filenames.txt';

// 1. Read the given file lipsum.txt
function readLipsum(callback) {
    fs.readFile(lipsumFilePath, 'utf-8', (err, data) => {
        if (err) return callback(err);
        console.log("1. Read lipsum text file.")
        callback(null, data);
    })
}

/**
 * Convert the content to uppercase & write to a new file. 
 * Store the name of the new file in filenames.txt
 */
function writeUppercaseAndStoreName(data, callback) {
    const upperFilePath = './upper.txt';;
    fs.writeFile(upperFilePath, data.toUpperCase(), (err) => {
        if (err) return callback(err);
        console.log("2. Wrote uppercase text file")
    })
    fs.appendFile(filenamesFilePath, upperFilePath + "\n", (err) => {
        if (err) return console.error("Error appending filename to filenames.txt:", err);
        console.log(" >> Appended filename to filenames.txt")
        callback(null, upperFilePath);
    })
}

/**
 * Read the new file and convert it to lower case. Then split the contents into 
 * sentences. Then write it to a new file. Store the name of the new file in
 *  filenames.txt 
 */
function writeLowercaseSplitAndStoreName(upperFile, callback) {
    const lowerFilePath = './LowercaseSentences.txt';
    fs.readFile(upperFile, 'utf-8', (err, data) => {
        if (err) return callback(err);
        const sentences = data.toLowerCase().split('.').join('.\n');
        fs.writeFile(lowerFilePath, sentences, (err) => {
            if (err) return callback(err);
            console.log('Lowercase sentences written to LowercaseSentences.txt');
            fs.appendFile(filenamesFilePath, `${lowerFilePath}\n`, (err) => {
                if (err) return callback(err);
                callback(null, lowerFilePath);
            });
        });
    });
}


/**
 * 4. Read the new files, sort the content, write it out to a new file. 
 * Store the name of the new file in filenames.txt
 */
function sortContentAndStoreName(lowerFile, callback) {
    const sortedFile = './sorted.txt';
    fs.readFile(lowerFile, 'utf-8', (err, data) => {
        if (err) return callback(err);
        const sortedContent = data.split('\n').sort().join('\n');
        fs.writeFile(sortedFile, sortedContent, (err) => {
            if (err) return callback(err);
            console.log('Sorted content written to sorted.txt');
            fs.appendFile(filenamesFilePath, `${sortedFile}\n`, (err) => {
                if (err) return callback(err);
                callback(null, sortedFile);
            });
        });
    });
}



/**
 * 5. Read the contents of filenames.txt and delete all the new files that are 
 * mentioned in that list simultaneously.
 */
function deleteFiles(callback) {
    fs.readFile(filenamesFilePath, 'utf-8', (err, data) => {
        if (err) return callback(err);
        const files = data.split('\n').filter((file) => file.trim() !== '');
        let pendingDeletes = files.length;
        if (pendingDeletes === 0) return callback(null);
        files.forEach((file) => {
            fs.unlink(file, (err) => {
                if (err) return callback(err);
                console.log(`Deleted file: ${file}`);
                pendingDeletes--;
                if (pendingDeletes === 0) {
                    callback(null);
                }
            });
        });
    });
}


// Main callbacks
// Execute the steps
readLipsum((err, content) => {
    if (err) return console.error('Error reading lipsum.txt:', err);
    writeUppercaseAndStoreName(content, (err, upperFile) => {
        if (err) return console.error('Error writing uppercase:', err);
        writeLowercaseSplitAndStoreName(upperFile, (err, lowerFile) => {
            if (err) return console.error('Error writing lowercase:', err);
            sortContentAndStoreName(lowerFile, (err, sortedFile) => {
                if (err) return console.error('Error sorting content:', err);
                console.log('All steps completed. Cleaning up...');
                deleteFiles((err) => {
                    if (err) return console.error('Error deleting files:', err);
                    console.log('All files cleaned up successfully!');
                });
            });
        });
    });
});