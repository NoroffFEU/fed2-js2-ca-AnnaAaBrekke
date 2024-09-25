export function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(name);
  console.log(`Query parameter "${name}" value:`, value); // Log the query parameter value
  return value;
}
