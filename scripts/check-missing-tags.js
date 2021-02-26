const fs = require('fs')

const METADATA_FILE_PATH =
	'D:\\Programming\\Node\\music-collection-database\\data\\tracks.json'
const CHECK_FOR_TAGS = [
	'track',
	'albumartist',
	'title',
	'album',
	'genre',
	'year',
	'artists',
	'artist',
]

const data = JSON.parse(fs.readFileSync(METADATA_FILE_PATH))

data.forEach(track => {
	CHECK_FOR_TAGS.forEach(tag => {
		if (!track[tag]) {
			console.log(`No ${tag} tag on ${track.title}`)
		}
	})
})