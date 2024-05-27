const path = require('path');

module.exports = {

  uploadDir: path.join(__dirname, '../public/uploads/'),

  isEmpty: function (obj) {
    for (const key in obj) {
      console.log(Object.hasOwnProperty.bind(obj)(key));
      if (Object.hasOwnProperty.bind(obj)(key)) {
        return false;
      }
    }

    return true;
  },
};
