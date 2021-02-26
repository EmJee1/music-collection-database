const fs = require('fs')

const METADATA_FILE_PATH =
	'D:\\Programming\\Node\\music-collection-database\\data\\tracks.json'

const DATA_TO_SHOW = [
	'amountOfTracks',
	'amountOfArtists',
	'amountOfAlbums',
	'amountOfComposers',
	'genres',
	'fileTypes',
	'amountOfFileTypes',
	'years',
	'amountOfYears',
]

const data = JSON.parse(fs.readFileSync(METADATA_FILE_PATH))

const bulkData = {
	amountOfTracks: data.length,
	artists: [],
	amountOfArtists: 0,
	albums: [],
	amountOfAlbums: 0,
	composers: [],
	amountOfComposers: 0,
	genres: [],
	amountOfGenres: 0,
	fileTypes: {},
	amountOfFileTypes: 0,
	years: {},
	amountOfYears: 0,
}

data.forEach(track => {
	track.artists?.forEach(artist => {
		if (!bulkData.artists.includes(artist)) bulkData.artists.push(artist)
	})
	if (!bulkData.albums.includes(track.album)) bulkData.albums.push(track.album)
	track.composer?.forEach(comp => {
		if (!bulkData.composers.includes(comp)) bulkData.composers.push(comp)
	})
	track.genre?.forEach(genr => {
		if (!bulkData.genres.includes(genr)) bulkData.genres.push(genr)
	})
	if (track.fileType) {
		if (!bulkData.fileTypes[track.fileType])
			bulkData.fileTypes[track.fileType] = 0
		bulkData.fileTypes[track.fileType]++
	}
	if (track.year) {
		if (!bulkData.years[track.year]) bulkData.years[track.year] = 0
		bulkData.years[track.year]++
	}
})

bulkData.amountOfArtists = bulkData.artists.length
bulkData.amountOfAlbums = bulkData.albums.length
bulkData.amountOfComposers = bulkData.composers.length
bulkData.amountOfGenres = bulkData.genres.length
bulkData.amountOfFileTypes = Object.keys(bulkData.fileTypes).length
bulkData.amountOfYears = Object.keys(bulkData.years).length

DATA_TO_SHOW.forEach(dataPart => {
	console.log(dataPart, ':', bulkData[dataPart])
})