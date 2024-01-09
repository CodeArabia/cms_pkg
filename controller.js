const fs = require('fs-extra');
const path = require('path');
const ncp = require('ncp').ncp;
const fse = require('fs-extra');


const controller = {
  createFile : (fileName) => {
    try {
      // Check if the file already exists
      if (fs.existsSync(fileName)) {
        console.log(`File "${fileName}" already exists.`);
      } else {
        // If the file doesn't exist, create it
        fs.writeFileSync(fileName, '');
        console.log(`File "${fileName}" created successfully.`);
      }
    } catch (error) {
      console.error(`Error creating or checking file "${fileName}": ${error.message}`);
    }
  },

   moveFile : (selectedFilePath, destinationPath, replaceIfExists = true) => {

    try {
      const fileName = path.basename(selectedFilePath);
      const destinationFilePath = path.join(destinationPath, fileName);
  
      // Check if the file already exists at the destination
      const fileExistsAtDestination = fs.existsSync(destinationFilePath);
  
      if (fileExistsAtDestination && replaceIfExists) {
        // If the file exists and replaceIfExists is true, delete the existing file
        fs.unlinkSync(destinationFilePath);
        console.log(`Existing file "${fileName}" at destination deleted.`);
      } else if (fileExistsAtDestination && !replaceIfExists) {
        // If the file exists and replaceIfExists is false, return a message and exit
        console.log(`File "${fileName}" already exists at destination. Not replaced.`);
        return `File "${fileName}" already exists at destination. Not replaced.`;
      }
  
      // Move the file to the destination
      fs.renameSync(selectedFilePath, destinationFilePath);
      console.log(`File "${fileName}" moved to "${destinationPath}" successfully.`);
  
      return `File "${fileName}" moved to "${destinationPath}" successfully.`;
    } catch (error) {
      console.error(`Error moving file: ${error.message}`);
      return `Error moving file: ${error.message}`;
    }
  },
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

  copyFile: (newPath, sourcePath, overwrite = false) => {
    try {
      if (!fse.existsSync(sourcePath)) {
        console.error(`Source file/directory '${sourcePath}' does not exist.`);
        return;
      }
  
      if (fse.existsSync(newPath)) {
        // If the destination file/directory already exists
        if (overwrite) {
          // If overwriting is allowed, remove the existing file/directory
          fse.removeSync(newPath);
          console.log(`File/directory ${newPath} removed.`);
        } else {
          // If overwriting is not allowed, print a message and return
          console.log(`File/directory ${newPath} already exists. Skipped.`);
          return;
        }
      }
  
      const sourceStats = fse.statSync(sourcePath);
  
      // Check if the destination path is a directory
      const isDestinationDirectory = fse.statSync(newPath).isDirectory();
  
      if (isDestinationDirectory) {
        // If the destination is a directory, construct the full destination path
        const fileName = path.basename(sourcePath);
        newPath = path.join(newPath, fileName);
      }
  
      if (sourceStats.isDirectory()) {
        // If the source is a directory, use fs-extra to copy its contents
        fse.copySync(sourcePath, newPath);
        console.log(`Directory ${sourcePath} copied to ${newPath}`);
      } else {
        // If the source is a file, use fs-extra to copy it
        fse.copyFileSync(sourcePath, newPath);
        console.log(`File ${sourcePath} copied to ${newPath}`);
      }
    } catch (error) {
      console.error(`Error copying file/directory: ${error.message}`);
    }
  },

  editFile: (filePath, newContentPath) => {
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

  deleteFile: (filePath) => {
    try {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  },

  progress :(operations) => {
    const totalSteps = operations.length * 100; // Assuming each operation contributes 100 steps
  
    return new Promise(async (resolve) => {
      let currentStep = 0;
  
      // Function to update the progress and check completion
      function updateProgress() {
        const progress = Math.floor((currentStep / totalSteps) * 100);
        console.log(`Progress: ${progress}%`);
  
        if (currentStep === totalSteps) {
          resolve();
        }
      }
  
      // Execute each operation asynchronously
      for (const operation of operations) {
        try {
          // Assuming each operation returns a promise
          await operation();
          currentStep += 100;
          updateProgress();
        } catch (error) {
          console.error(`Error in operation: ${error.message}`);
          // Handle errors if needed
        }
      }
    }).then(() => {
      console.log("All operations completed successfully!");
    })
    .catch((error) => {
      console.error(`Error in progress bar: ${error.message}`);
    });;
  },
  run: (scriptPath) => {
    const { spawn } = require('child_process');
    const process = spawn('node', [scriptPath]);
  
    let scriptOutput = ''; // Store the script output
  
    process.stdout.on('data', (data) => {
      scriptOutput += data.toString(); // Concatenate the output chunks
    });
  
    process.stderr.on('data', (data) => {
      console.error(`Script error: ${data}`);
    });
  
    process.on('close', (code) => {
      console.log(`Script output: ${scriptOutput}`);
      console.log(`Script exited with code ${code}`);
    });
  },
};

module.exports = controller;
