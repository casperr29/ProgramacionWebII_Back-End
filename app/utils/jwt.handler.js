const jwt = require('jsonwebtoken');
require('dotenv').config();
//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvYmVydG8iLCJpYXQiOjE1MTYyMzkwMjJ9.sJjmNblu1hQQN02Ji6RjYCFwfyEqu5psa7g7nZ8YXuw';

const signToken = async (user) => {
  const signToken = await jwt.sign(
    {
      _id: user.id,
      role: user.user_type,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return signToken;
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { signToken, verifyToken };
