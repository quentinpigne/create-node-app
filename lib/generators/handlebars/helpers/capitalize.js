'use strict';
module.exports = (aString) => {
  return aString.replace(/^\w/, (c) => c.toUpperCase());
};
