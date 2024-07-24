const fs = require('fs');

// Read the translations JSON file
const translations = fs.readFileSync('translations.json', 'utf8');

// Read the JavaScript file
let jsFile = fs.readFileSync('injector.js', 'utf8');

// Replace the placeholder with the actual translations
jsFile = jsFile.replace('{/* TRANSLATIONS_JSON */}', translations);

// Check if dist directory exists
// If !dist directory, create!
if (!fs.existsSync('./dist')) {
	fs.mkdirSync('dist');
	console.log("Created 'dist' directory...");
}

// Write the combined content to a new file
fs.writeFileSync('./dist/compiled.js', jsFile);

console.log('Compiled succesfully to compiled.js');
