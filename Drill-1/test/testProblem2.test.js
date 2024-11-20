import { readLipsum, writeUppercaseAndStoreName, writeLowercaseSplitAndStoreName, sortContentAndStoreName, deleteFiles } from "../problem2.js";


try {
    readLipsum((err, content) => {
        if (err) return console.error('Error reading lipsum.txt:', err);
        writeUppercaseAndStoreName(content, (err, upperFile) => {
            if (err) return console.error('Error writing uppercase:', err);
            writeLowercaseSplitAndStoreName(upperFile, (err, lowerFile) => {
                if (err) return console.error('Error writing lowercase:', err);
                sortContentAndStoreName(lowerFile, (err, sortedFile) => {
                    if (err) return console.error('Error sorting content:', err);
                    console.log('\nAll steps completed. Cleaning up...');
                    deleteFiles((err) => {
                        if (err) return console.error('Error deleting files:', err);
                        console.log('All files cleaned up successfully!');
                    });
                });
            });
        });
    });
} catch (err) {
    console.log("Error:", err);
}
