const path = require('path')
const fs = require('fs')

const scanAllAudioFiles = rootDir => {
	const filesToRename = []

	const scanFileDir = dir => {
		if (!dir) {
			console.error('The path is empty or does not exist:', dir)
			return
		}

		fs.readdirSync(dir).forEach(file => {
			if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
				if (!['.flac', '.mp3'].includes(path.extname(file))) {
					console.error('We skipped files that were not .mp3 or .flac:', file)
					return
				}
				filesToRename.push(path.join(dir, file))
			} else {
				scanFileDir(path.join(dir, file))
			}
		})
	}

	scanFileDir(rootDir)

	return filesToRename
}

module.exports = scanAllAudioFiles