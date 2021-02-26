CREATE TABLE tracks (
id INTEGER NOT NULL,
track_name TEXT NOT NULL,
album_id INTEGER NOT NULL,CONSTRAINT "albums-tracks"
FOREIGN KEY (album_id)
REFERENCES albums(id),
PRIMARY KEY(id));

CREATE TABLE artists (
id INTEGER NOT NULL,
artist_name TEXT NOT NULL,
PRIMARY KEY(id));

CREATE TABLE "artistTracks" (
artist_track_id INTEGER NOT NULL,
tracks_id INTEGER NOT NULL,
artists_id INTEGER NOT NULL,CONSTRAINT "tracks-artistTracks"
FOREIGN KEY (tracks_id)
REFERENCES tracks(id)
,CONSTRAINT "artists-artistTracks"
FOREIGN KEY (artists_id)
REFERENCES artists(id),
PRIMARY KEY(artist_track_id));

CREATE TABLE albums (
id INTEGER NOT NULL,
album_name TEXT NOT NULL,
PRIMARY KEY(id));