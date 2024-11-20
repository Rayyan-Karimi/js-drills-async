import { createFiles, deleteFiles } from "../problem1.js";

async function execute() {
    await createFiles()
        .then(() => deleteFiles())
        .catch((err) => console.error("Unexpected error during execution", err))
}
execute();