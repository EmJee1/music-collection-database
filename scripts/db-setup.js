// require dependencies
const fs = require('fs')

// remove old database file if it exists
if (fs.existsSync('./database/music-collection.db'))
	fs.unlinkSync('./database/music-collection.db')

// read sql file
const setupSql = fs.readFileSync('./database/sql/setup.sql').toString()

// require database connection
const db = require('../database/connection/db.connection.js')

// do database actions
db.serialize(() => {
	// create array from sql file, then run statements one by one
	setupSql.split('\r\n\r\n').forEach(sql => {
		db.run(sql)
	})
})

db.close()