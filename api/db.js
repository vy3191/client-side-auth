const fs = require("fs-extra")
const syspath = require("path")
const uuid = require("uuid")

const DB_PATH = syspath.resolve(__dirname, "../database.json")

try {
	read()
} catch (err) {
	const defaultValues = {
		users: [
			{
				id: uuid.v4(),
				name: "Jane Doe",
				email: "jane@doe.com",
				password: "abc123",
			},
		],
	}

	write(defaultValues)
}

function read() {
	return fs.readJsonSync(DB_PATH)
}

function write(data) {
	return fs.outputFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

module.exports = {
	read,
	write,
}
