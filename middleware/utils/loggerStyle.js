const colors = require('colors');

const methodStyle = type => {
  switch (type) {
    case 'GET':
      return type.bold.green;
    case 'POST':
      return type.bold.yellow;
    case 'PUT':
      return type.bold.blue;
    case 'DELETE':
      return type.bold.red;
    default:
      return type.bold;
  }
};

const statusStyle = code => {
  if (code >= 500) return String(code).bold.red;
  else if (code >= 400) return String(code).bold.yellow;
  else if (code >= 300) return String(code).bold.blue;
  else if (code >= 200) return String(code).bold.green;
  else return String(code).bold;
};

module.exports = { methodStyle, statusStyle };
