import { createFiles, deleteFiles } from "../problem1.js";


try {
    createFiles((err) => {
        if (err) console.error("Error creating files:", err);
        else {
            console.log("All files created.");
            deleteFiles((err) => {
                if (err) console.error("Error deleting files:", err);
                else console.log("All files deleted.");
            });
        }
    })
} catch (err) {
    console.log("Error:", err);
}

