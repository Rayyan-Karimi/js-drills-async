import { readFilenames, writeLowerCaseFile, sortAndWrite, deleteFiles } from "../problem2.js";

async function execute() {
    await readFilenames()
        .then(() => writeLowerCaseFile())
        .then(() => sortAndWrite())
        .then(() => deleteFiles())
        .catch((err) => console.error("Unexpected error during process:", err));
}
execute();