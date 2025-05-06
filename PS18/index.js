const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"));

// Schema and Model
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('Song', songSchema);

// c) Insert 5 sample songs (only if collection is empty)
app.get('/init', async (req, res) => {
    const count = await Song.countDocuments();
    if (count === 0) {
        await Song.insertMany([
            { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
            { Songname: 'Chaiyya Chaiyya', Film: 'Dil Se', Music_director: 'A.R. Rahman', Singer: 'Sukhwinder Singh' },
            { Songname: 'Kal Ho Naa Ho', Film: 'Kal Ho Naa Ho', Music_director: 'Shankar-Ehsaan-Loy', Singer: 'Sonu Nigam' },
            { Songname: 'Kun Faya Kun', Film: 'Rockstar', Music_director: 'A.R. Rahman', Singer: 'Javed Ali' },
            { Songname: 'Gerua', Film: 'Dilwale', Music_director: 'Pritam', Singer: 'Arijit Singh' }
        ]);
        res.send("5 songs inserted.");
    } else {
        res.send("Songs already initialized.");
    }
});

// d) Count and List all songs
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    let html = `<h2>Total Songs: ${count}</h2><table border="1"><tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
    songs.forEach(s => {
        html += `<tr><td>${s.Songname}</td><td>${s.Film}</td><td>${s.Music_director}</td><td>${s.Singer}</td><td>${s.Actor || ''}</td><td>${s.Actress || ''}</td></tr>`;
    });
    html += "</table>";
    res.send(html);
});

// e) List by Music Director
app.get('/songs/musicdirector/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.send(songs);
});

// f) List by Music Director and Singer
app.get('/songs/musicdirector/:md/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.md, Singer: req.params.singer });
    res.send(songs);
});

// g) Delete a song (by name)
app.delete('/songs/:name', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.send(`Deleted song: ${req.params.name}`);
});

// h) Add a new favourite song
app.post('/songs', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.send("Song added.");
});

// i) Songs by singer from a film
app.get('/songs/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Film: req.params.film, Singer: req.params.singer });
    res.send(songs);
});

// j) Update song with actor and actress
app.put('/songs/:name', async (req, res) => {
    await Song.updateOne({ Songname: req.params.name }, {
        $set: {
            Actor: req.body.Actor,
            Actress: req.body.Actress
        }
    });
    res.send("Song updated with Actor and Actress.");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

