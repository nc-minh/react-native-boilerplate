// Safely parses a JSON string into a JavaScript object.
// If parsing fails, logs a 'JSON_PARSE_ERROR' message to the console,
// returns null to avoid crashing the application, and logs the error details.
// Parsing can fail due to invalid JSON format or unexpected data.
export const jsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("JSON_PARSE_ERROR: ", error);
  }
};

// Converts a JavaScript value to a JSON string.
// If conversion fails, logs a 'JSON_STRINGIFY_ERROR' message to the console,
// returns an empty string to prevent any potential issues, and logs the error details.
// Conversion can fail due to circular references or unsupported data types.
export const jsonStringify = (value: any, replacer?: any) => {
  try {
    return JSON.stringify(value, replacer);
  } catch (error) {
    console.log("JSON_STRINGIFY_ERROR: ", error);
    return "";
  }
};
