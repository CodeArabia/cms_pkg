// requests.js
const axios = require('axios');

function handleRequestError(error, requestType) {
  if (error.response) {
    console.error(`${requestType} Request Error - Status Code: ${error.response.status}`);
    console.error('Response Data:', error.response.data);
  } else if (error.request) {
    console.error(`${requestType} Request Error - No Response Received`);
  } else {
    console.error(`${requestType} Request Error - ${error.message}`);
  }
}

// Function to make a GET request
async function getData(url) {
  try {
    const response = await axios.get(url);
    console.log('GET Request:', response.data);
  } catch (error) {
    handleRequestError(error, 'GET');
  }
}

// Function to make a POST request
async function postData(url, data) {
  try {
    const response = await axios.post(url, data);
    console.log('POST Request:', response.data);
  } catch (error) {
    handleRequestError(error, 'POST');
  }
}

// Function to make a PUT request
async function putData(url, data) {
  try {
    const response = await axios.put(url, data);
    console.log('PUT Request:', response.data);
  } catch (error) {
    handleRequestError(error, 'PUT');
  }
}

// Function to make a DELETE request
async function deleteData(url) {
  try {
    const response = await axios.delete(url);
    console.log('DELETE Request:', response.data);
  } catch (error) {
    handleRequestError(error, 'DELETE');
  }
}

module.exports = { getData, postData, putData, deleteData };
