# gifchat.fun

Yes it's stupid. and YES it's fun!

To get it running locally you'll need a <a href="https://developers.giphy.com/">Giphy API</a> and put that into a .env file. You have a .env.example file as an example.

Then you'll need the /build directory from the front end so follow these instructions from the root of this repo


### How to run it locally:
```
cd  react-client
npm i
cd ..
npm i
npm run build  # this builds the react front end
npm start

```

### Developing / Changing code
You need to run TWO developer scripts. One that will run the react code in development and the other the backend in nodemon.

```
npm run dev 
# in another terminal
npm run react-dev
```
And now you'll have a local version you can chang ENJOY!

And YES it's a monorepo and yes when you start the api, it knows how to start and show the react page (from the build directory) <br>
And YES you can see it on https://gifchat.fun 

You're welcome!
