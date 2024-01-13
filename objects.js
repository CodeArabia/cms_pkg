function gok(obj) {
  return obj ? Object.keys(obj) : [];
}

// Function to get all values of an object
function gov(obj) {
  return obj ? Object.values(obj) : [];
}

module.exports = { gok, gov };