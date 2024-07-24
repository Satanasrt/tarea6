const fs = require("node:fs");
const dbName = "koders.json";

function init() {
    const dbExists = fs.existsSync(dbName);
    if (!dbExists) {
        fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
    }
}

function getKoders() {
    const fileContent = fs.readFileSync(dbName, "utf8");
    const koders = JSON.parse(fileContent);
    return koders;
}

function saveKoders(koders) {
    fs.writeFileSync(dbName, JSON.stringify(koders), "utf8");
}

const command = process.argv[2];
init();

switch (command) {
    case "ls": {
        const kodersList = getKoders();
        if (kodersList.length === 0) {
            console.info("No koders found 🦉");
            process.exit(0);
        }
        kodersList.forEach((koder, idx) => {
            console.log(idx + 1, "-", koder);
        });
        break;
    }
    case "add": {
        const kodersList = getKoders();
        const newKoder = process.argv[3];
        if (!newKoder) {
            console.error("Please provide a koder name to add.");
            process.exit(1);
        }
        kodersList.push(newKoder);
        saveKoders(kodersList);
        console.log(`Koder ${newKoder} added successfully.`);
        break;
    }
    case "rm": {
        const kodersList = getKoders();
        const koderIndex = parseInt(process.argv[3]) - 1;
        if (isNaN(koderIndex) || koderIndex < 0 || koderIndex >= kodersList.length) {
            console.error("Invalid index. Please provide a valid koder index.");
            process.exit(1);
        }
        const removedKoder = kodersList.splice(koderIndex, 1);
        saveKoders(kodersList);
        console.log(`Koder ${removedKoder} removed successfully.`);
        break;
    }
    case "reset": {
        saveKoders([]);
        console.log("All koders have been removed.");
        break;
    }
    default: {
        console.log("Unknown command. Use 'ls' to list koders, 'add' to add a new koder, 'rm' to remove a koder, or 'reset' to clear all koders.");
        break;
    }
}
