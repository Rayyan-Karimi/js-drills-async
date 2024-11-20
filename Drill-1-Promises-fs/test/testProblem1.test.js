import { createFiles, deleteFiles } from "../problem1.js";

async function execute() {
    await createFiles();
    await deleteFiles();
}
execute();