const fs = require("fs");

console.log("Updating the app...")

const corePackage = require("./packages/core/package.json");
const coreVersion = corePackage.version;
console.log(`Core version: ${coreVersion}`);

// update in packages/react/package.json
const reactPackage = require("./packages/react/package.json");
reactPackage.dependencies["@nance/nance-sdk"] = `^${coreVersion}`;
fs.writeFileSync("./packages/react/package.json", JSON.stringify(reactPackage, null, 2));

console.log("React package updated");
