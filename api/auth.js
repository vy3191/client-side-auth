const jwt = require("jsonwebtoken")

const JWT_SECRET = "super-secret"

function generateToken(userId) {
	return jwt.sign({ id: userId }, JWT_SECRET)
}

function verifyToken(token) {
	return jwt.verify(token, JWT_SECRET)
}

module.exports = {
	generateToken,
	verifyToken,
}
