const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const httpError = require("http-errors")
const db = require("./db")
const auth = require("./auth")

const app = express()
const port = 8080
const host = "0.0.0.0"

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res, next) => {
	res.json({
		message: "Welcome",
	})
})

app.post("/signup", (req, res, next) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		return next(httpError(400, "Need to send a name, email, and password!"))
	}

	const data = db.read()

	if (data.users.find((v) => v.email === req.body.email)) {
		return next(httpError(409, "Email is already used!"))
	}

	const user = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	}

	data.users = data.users.concat(user)
	db.write(data)

	res.status(201).json({
		token: auth.generateToken(user.id),
	})
})

app.post("/signin", (req, res, next) => {
	const authErr = httpError(401, "Invalid email or password!")

	if (!req.body.email || !req.body.password) {
		return next(authErr)
	}

	const data = db.read()
	const user = data.users.find((v) => v.email === req.body.email)

	if (!user || user.password !== req.body.password) {
		return next(authErr)
	}

	res.json({
		token: auth.generateToken(user.id),
	})
})

app.get("/me", (req, res, next) => {
	const authErr = httpError(403, "Invalid authentication token")

	if (!req.headers.authorization) {
		return next(authErr)
	}

	try {
		const token = req.headers.authorization.replace(/^bearer /i, "")
		const decoded = auth.verifyToken(token)

		if (!decoded.id) {
			return next(authErr)
		}

		const data = db.read()
		const user = data.users.find((v) => v.id === decoded.id)

		delete user.password

		res.json(user)
	} catch (err) {
		return next(authErr)
	}
})

app.use((err, req, res, next) => {
	if (err.expose) {
		res.status(err.statusCode).json({
			message: err.message,
		})
	} else {
		console.log("Error:", err)

		res.status(500).json({
			message: "An unknown error occurred",
		})
	}
})

app.listen(port, host, () => {
	console.log(`=> Server running at http://localhost:${port}`)
})
