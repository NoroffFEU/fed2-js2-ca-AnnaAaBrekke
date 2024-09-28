/**
 * Retrieves the value of a query parameter from the current URL.
 * 
 * @param {string} name - The name of the query parameter to retrieve.
 * @returns {string|null} - The value of the query parameter, or null if it doesn't exist.
 */
export function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
