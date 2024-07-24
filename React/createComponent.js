const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const componentName = args[0];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

// Default paths
const defaultComponentFilePath = path.join(__dirname, 'src/components', `${componentName}.jsx`);
const defaultIndexFilePath = path.join(__dirname, 'src/components', 'index.js');
const defaultStylesFilePath = path.join(__dirname, 'src/styles', `${componentName.toLowerCase()}.module.scss`);

// Declare variables at the top
const componentFilePath = defaultComponentFilePath;
const indexFilePath = defaultIndexFilePath;
const stylesFilePath = defaultStylesFilePath;

// Check if component already exists
const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8').toLowerCase();
if (indexFileContent.includes(`export { default as ${componentName.toLowerCase()} }`)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

// 1. Create the component file with the template
const componentTemplate = `import React from 'react'
import styles from "@/styles/${componentName}.module.scss"
export default function ${componentName}({...props}) {
  return (
    <div className={styles.container}>
    </div>
    )
}
`;

fs.writeFileSync(componentFilePath, componentTemplate);

// 2. Append the export line to the index.js file
const exportLine = `\nexport { default as ${componentName} } from '@/components/${componentName}';\n`;

fs.appendFileSync(indexFilePath, exportLine);

// 3. Create the styles file with the template
const stylesTemplate = `.container {
/* insert style */
}
`;

fs.writeFileSync(stylesFilePath, stylesTemplate);

console.log(`Component ${componentName} created successfully.`);
