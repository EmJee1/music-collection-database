const scanAudioFiles = require('../utils/scanAudioFiles.js')
const mm = require('music-metadata')
const path = require('path')
const fs = require('fs')

const SCAN_DIR = 'F:\\Music\\K-pop'
const METADATA_FILE_PATH =
	'D:\\Programming\\Node\\music-collection-database\\data\\tracks.json'

// remove old metadata file if it exists
if (fs.existsSync(METADATA_FILE_PATH)) fs.unlinkSync(METADATA_FILE_PATH)

const parseMetaData = async files => {
	const finalMetadata = []
	for (const file of files) {
		try {
			const common = (await mm.parseFile(file)).common
			const metadata = {
				track: common.track,
				disk: common.disk,
				albumartist: common.albumartist,
				composer: common.composer,
				title: common.title,
				album: common.album,
				genre: common.genre,
				year: common.year,
				artists: common.artists,
				artist: common.artist,
				fileType: path.extname(file),
				filePath: file,
			}
			finalMetadata.push(metadata)
		} catch (err) {
			console.error(err.message)
		}
	}
	return finalMetadata
}

parseMetaData(scanAudioFiles(SCAN_DIR)).then(res => {
	fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(res))
})