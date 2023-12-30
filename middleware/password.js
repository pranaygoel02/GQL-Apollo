const bcrypt = require("bcrypt");

const validatePassword = async (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = validatePassword;