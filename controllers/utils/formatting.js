// Formatting query params with multiple entries
const formatParams = (initialQuery) => initialQuery.split(',').join(' ');

module.exports = formatParams;
