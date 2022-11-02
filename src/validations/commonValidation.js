// Return false if an empty body is found otherwise return true
const isValidBody = (params) => !(Object.keys(params).length === 0);

const isValidField = (value) =>
  !(
    typeof value === "undefined" ||
    typeof value === "null" ||
    (typeof value === "string" && value.trim().length === 0)
  );

module.exports = { isValidBody, isValidField };
