const bcrypt = require('bcryptjs');

const createPasswordHash = async(password) => {
    return bcrypt.hash(password, 8);
}

const checkPassword = async (user, password) => {
    return bcrypt.compare(password, user.password);
  };

module.exports = {
    createPasswordHash,
    checkPassword
}