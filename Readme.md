---
runme:
  id: 01HHPC51RK19VXAJJT69JP6255
  version: v2.2
---

## Usage

# cms_pkg

[![npm version](https://badge.fury.io/js/cms_pkg.svg)](https://www.npmjs.com/package/cms_pkg)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Modern JavaScript library for content management system (CMS) functionalities.

##Installation

```javascript {"id":"01HHPD1Q47S9D9BPQVJNEABAHP"}
npm install cms_pkg axios
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

requests.js
The requests.js module exports functions for making various HTTP requests using Axios. Each function handles error responses and logs relevant information.

Functions
getData(url): Make a GET request to the specified URL.

postData(url, data): Make a POST request to the specified URL with the given data.

putData(url, data): Make a PUT request to the specified URL with the given data.

deleteData(url): Make a DELETE request to the specified URL.

Usage Instructions
Example Usage within cms library

```javascript {"id":"01HKP0ACA8PK14NHM319VPXYYT"}
const cms = require('cms');

// Example GET request
cms.requests.getData('https://api.example.com/data');

// Example PUT request
cms.requests.putData('https://api.example.com/data', { "example": "" });

```

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC) - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with passion and dedication.
- Inspired by the need for a simple CMS library in JavaScript.