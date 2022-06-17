require('dotenv').config();
const fetch = require("node-fetch")
const http = require("http"); // standard http server
const express = require("express"); // express library
const cors = require('cors'); // cors middleware to have a great API experience
const path = require("path"); // express has a method for using local path. but now.sh doesn't like it.
const app = express(); // Express server (we seperate to introduce middleware) you could also do: app = require("express")()
const port = process.env.PORT || 8080; // use any port you want or use a enviromental PORT variable
app.use(express.json()); // Now express no longer needs the body-parser middleware and has it's own.
app.use(cors()); // For APIS this allows CORS access
app.use(express.static(path.join(__dirname, "../client/build"))); // This is for static files. like CSS or Images etc.
const giphyapi = process.env.GIPHYAPI;
const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyapi}&limit=5&offset=0&rating=g&lang=en&q=`;
const { Server } = require("socket.io");
let server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

app.get("/giphy/:search", async (req,res) => {
    searchStr = encodeURI(req.params.search);
    console.log(giphyUrl + searchStr)
    await fetch(giphyUrl + searchStr)
    .then(res => res.json())
    .then(async reply => {
        console.log(reply.data.length)
        const gifs = reply.data.map(x=> x.images.fixed_height_downsampled.url)
        // send this to slack!
        res.json(gifs); 
    }).catch(ex =>  {
        console.error(ex)
        res.status(500).send("error: "+ex)
    })
})



// socket.io chat
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


// start the web server.
server.listen(8080, () => {
    console.log('listening on *:8080');
  });