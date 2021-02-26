// require dependencies
const sqlite3 = require('sqlite3').verbose()

// connect to sqlite database
const db = new sqlite3.Database('./database/music-collection.db', err => {
	if (err) console.error('SQLite connection error:', err.message)
	else console.log('SQLite connection successful')
})

module.exports = db