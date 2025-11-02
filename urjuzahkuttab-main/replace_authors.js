const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/data/timelineEvents.ts', 'utf8');

// Replace all author names
content = content.replace(/author: 'Latifah',/g, "author: 'Latifah Sumali',");
content = content.replace(/author: 'Ella',/g, "author: 'Fadilla Amri Yunara',");
content = content.replace(/author: 'Veni',/g, "author: 'Veny Ardini',");
content = content.replace(/author: 'Ratih',/g, "author: 'Ratih Ummu Abdullah',");

// Write back to file
fs.writeFileSync('src/data/timelineEvents.ts', content);

console.log('All author names have been updated successfully!');