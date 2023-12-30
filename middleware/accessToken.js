const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_TIME = '30 days';
const REFRESH_TOKEN_TIME = '365 days';

const generateAccessToken = async ({ email, password, $id, type = 'ACCESS' }) => {
    return jwt.sign({email, password, $id}, type === 'REFRESH' ? process.env.REFRESH_TOKEN_SECRET  : process.env.ACCESS_TOKEN_SECRET, {expiresIn: type === 'REFRESH' ? REFRESH_TOKEN_TIME : ACCESS_TOKEN_TIME });
}

const validateAccessToken = ({accessToken, type = 'ACCESS'}) => {
    if (accessToken == null) throw new Error("No access token provided");
    const user = jwt.verify(accessToken, type === 'REFRESH' ? process.env.REFRESH_TOKEN_SECRET  : process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new Error(`Invalid ${type} token`);
        return user;
    })
    return user;
}

module.exports = {generateAccessToken, validateAccessToken};