---
runme:
  id: 01HHPC51RK19VXAJJT69JP6255
  version: v2.0
---

## Usage

# cms_pkg

[![npm version](https://badge.fury.io/js/cms_pkg.svg)](https://www.npmjs.com/package/cms_pkg)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Modern JavaScript library for content management system (CMS) functionalities.



##Installation

```javascript {"id":"01HHPD1Q47S9D9BPQVJNEABAHP"}
npm install cms_pkg
```

```javascript {"id":"01HHPD3K8VSATF4MJZ5V1ATN55"}
const cms = require('cms_pkg');

// Example usage:
cms.controller.copy('newFile.txt', 'sourceFile.txt');
cms.controller.edit('editedFile.txt', 'newContent.txt');
cms.controller.delete('fileToDelete.txt');
cms.controller.run('scriptToRun.js');
```

## Functions

### `copy(newPath, sourcePath)`

Copy a file from the source path to a new path.

### `edit(filePath, newContentPath)`

Edit a file by replacing its content with the content from another file, showing the changes made.

### `delete(filePath)`

Delete a file.

### `run(scriptPath)`

Run a Node.js script and display the output and error messages.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC) - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with passion and dedication.
- Inspired by the need for a simple CMS library in JavaScript.