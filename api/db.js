const fs = require("fs-extra")
const syspath = require("path")

const DB_PATH = syspath.resolve(__dirname, "../database.json")

fs.ensureFileSync(DB_PATH)

function read() {
	const defaultValues = {
		users: [],
	}

	return fs.readJsonSync(DB_PATH, { throws: false }) || defaultValues
}

function write(data) {
	return fs.outputFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

module.exports = {
	read,
	write,
}
