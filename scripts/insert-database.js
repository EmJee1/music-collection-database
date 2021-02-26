const fs = require('fs')
const db = require('../database/connection/db.connection.js')

const METADATA_FILE_PATH =
	'D:\\Programming\\Node\\music-collection-database\\data\\tracks.json'

const data = JSON.parse(fs.readFileSync(METADATA_FILE_PATH))
const artists = []
const albums = []

data.forEach(track => {
	if (track.album && !albums.includes(track.album)) albums.push(track.album)
	if (track.artists) {
		track.artists.forEach(artist => {
			if (!artists.includes(artist)) artists.push(artist)
		})
	}
})

// function to get the database row id of the supplied column-data
const getDatabaseID = (arr, search) =>
	arr.indexOf(search) !== -1 ? arr.indexOf(search) + 1 : false

// function to replace double quotes with single qoutes, doubles break the SQL statement
const sanitizeSQL = str => str.replaceAll('"', "'")

// create sql statements
let artistTracksSql = 'INSERT INTO artistTracks (tracks_id, artists_id) VALUES '
let tracksSql = 'INSERT INTO tracks (track_name, album_id) VALUES '
let artistsSql = 'INSERT INTO artists (artist_name) VALUES '
let albumsSql = 'INSERT INTO albums (album_name) VALUES '

albums.forEach(album => (albumsSql += `("${sanitizeSQL(album)}"),`))
albumsSql = albumsSql.slice(0, -1)

artists.forEach(artist => (artistsSql += `("${sanitizeSQL(artist)}"),`))
artistsSql = artistsSql.slice(0, -1)

data.map((track, index) => {
	if (!track.title || !track.album || !track.artists) {
		console.log(
			'Skipped track because it did not contain the title, artists and / or album tag(s)'
		)
		return
	}
	tracksSql += `("${sanitizeSQL(track.title)}", "${getDatabaseID(
		albums,
		track.album
	)}"),`
	track.artists.forEach(
		artist =>
			(artistTracksSql += `("${index + 1}", "${getDatabaseID(artists, artist)}"),`)
	)
})
tracksSql = tracksSql.slice(0, -1)
artistTracksSql = artistTracksSql.slice(0, -1)

db.serialize(() => {
	db.run(`DELETE FROM albums`)
	db.run(albumsSql)

	db.run(`DELETE FROM artists`)
	db.run(artistsSql)

	db.run(`DELETE FROM tracks`)
	db.run(tracksSql)

	db.run(`DELETE FROM artistTracks`)
	db.run(artistTracksSql)
})

db.close()
