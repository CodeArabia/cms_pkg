const fs = require('fs-extra');
const path = require('path');

const controller = {
  moveDirectory: (sourcePath, destinationPath) => {
    try {
      // Check if the source directory exists
      if (fs.existsSync(sourcePath)) {
        // Move the directory to the destination
        fs.moveSync(sourcePath, destinationPath, { overwrite: true });
        console.log(`Directory ${sourcePath} moved to ${destinationPath} successfully.`);
      } else {
        console.log(`Source directory ${sourcePath} does not exist.`);
      }
    } catch (error) {
      console.error(`Error moving directory ${sourcePath}: ${error.message}`);
    }
  },
  createDirectory: (directoryPath) => {
    try {
      // Check if the directory already exists
      if (!fs.existsSync(directoryPath)) {
        // Create the directory
        fs.mkdirSync(directoryPath);
        console.log(`Directory ${directoryPath} created successfully.`);
      } else {
        console.log(`Directory ${directoryPath} already exists.`);
      }
    } catch (error) {
      console.error(`Error creating directory ${directoryPath}: ${error.message}`);
    }
  },

  deleteDirectory: (directoryPath) => {
    try {
      // Check if the directory exists
      if (fs.existsSync(directoryPath)) {
        // Get all files and subdirectories in the directory
        const files = fs.readdirSync(directoryPath);

        // Iterate over each file and subdirectory
        for (const file of files) {
          const filePath = path.join(directoryPath, file);

          // Check if it's a file or a subdirectory
          const isDirectory = fs.statSync(filePath).isDirectory();

          // If it's a subdirectory, recursively delete it
          if (isDirectory) {
            controller.deleteDirectory(filePath);
          } else {
            // If it's a file, delete it
            fs.unlinkSync(filePath);
          }
        }

        // After deleting all files and subdirectories, remove the directory itself
        fs.rmdirSync(directoryPath);
        console.log(`Directory ${directoryPath} deleted successfully.`);
      } else {
        console.log(`Directory ${directoryPath} does not exist.`);
      }
    } catch (error) {
      console.error(`Error deleting directory ${directoryPath}: ${error.message}`);
    }
  },

  copy: (newPath, sourcePath) => {
    try {
      if (fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
      }

      fs.copyFileSync(sourcePath, newPath);
      console.log(`File ${sourcePath} copied to ${newPath}`);
    } catch (error) {
      console.error(`Error copying file: ${error.message}`);
    }
  },

  edit: (filePath, newContentPath) => {
    try {
      const oldContent = fs.readFileSync(filePath, 'utf-8');
      const newContent = fs.readFileSync(newContentPath, 'utf-8').split('\n');
      const changes = [];

      newContent.forEach((line, index) => {
        if (oldContent.includes(line)) {
          changes.push(`[-] ${index + 1}: ${line}`);
        } else {
          changes.push(`[+] ${index + 1}: ${line}`);
        }
      });

      fs.writeFileSync(filePath, newContent.join('\n'));
      console.log(`File ${filePath} edited:\n${changes.join('\n')}`);
    } catch (error) {
      console.error(`Error editing file: ${error.message}`);
    }
  },

  delete: (filePath) => {
    try {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  },

  run: (scriptPath) => {
    const { spawn } = require('child_process');
    const process = spawn('node', [scriptPath]);

    process.stdout.on('data', (data) => {
      console.log(`Script output: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`Script error: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`Script exited with code ${code}`);
    });
  },
};

module.exports = controller;
