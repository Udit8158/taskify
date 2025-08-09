const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
  console.log('hashing')
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword
  } catch (error) {
    console.log('hashing bcrypt error ', error)
  }
};

const comparePassword = async(plainPassword, hashedPassword) => {
    try {
        const result = await bcrypt.compare(plainPassword, hashedPassword)
        return result // true / false
    } catch (error) {
        console.log('compare password bcrypt error ', error)
    }
}
module.exports = {hashPassword, comparePassword}