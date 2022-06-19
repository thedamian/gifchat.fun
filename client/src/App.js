import React, { useState, useEffect,useCallback } from 'react';
import Chat from "./components/chat"
import GifChoose from "./components/gifChoose"
import io from 'socket.io-client';
import './App.css';

function App() {
  const initMsg = {
    pic: "https://media.giphy.com/media/WJjLyXCVvro2I/giphy-downsized.gif",
    who: "Damian",
    type: "received"
  }

  const [chat,setChat] = useState([initMsg]);
  const [typingMsg,setTypingMsg] = useState("");
  const [chooseGif,setChooseGif] = useState(false);
  const [gifs,setGifs] = useState([])
  const [name,setName] = useState("damians");
  const [socket, setSocket] = useState(null);
 
  const getDomain = () => {
   const domain = window.location.hostname;
   if (domain == "localhost") {
    return "http://localhost:8080"
   } else {
    return "https://" + window.location.hostname;
   }
}
  
  useEffect(() => {
    const newSocket = io(getDomain());
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(()=> {
   let you = prompt("your name?")
   setName(you)
  },[])

  let Hello = ""
  useEffect(()=> {
      Hello = name ? `<span>Hello <strong>${name}</strong></span>` : '';
  },[name])

  const handleMessage = (msg) => {
    setChat((priorChat) => {
      priorChat.push(msg);
      return priorChat;
    })
   // socket.emit("chat message",handleMessage);
  }

  useEffect(() => {
    if (socket) {
  
      // subscribe to socket events
      socket.on("chat message",handleMessage); 

      return () => {
        // before the component is destroyed
        // unbind all event handlers used in this component
        socket.off("chat message", handleMessage);
      };
    }
  }, [socket]);

  const handleChoice = (e) => {
    const gif = e.target.src;
    socket.emit("chat message", {
      pic: gif,
      who: name
    });
    setChooseGif(false);
  }

  const handleTyping = (e) => {
    setTypingMsg(e.target.value);
  }

  const getGifs = (e) => {
    e.preventDefault()
    fetch(getDomain()+"/giphy/"+encodeURI(typingMsg))
    .then(res=> res.json())
    .then(gifs => {
      console.log(gifs);
      setGifs(gifs);
      setChooseGif(true);

    })
    
  }

  return (
    <div className="app">
       <header>
          <h1>Giphy Chat.fun</h1>
          <div className="user-bio">{Hello}
          <img src="https://avatars.dicebear.com/api/initials/damianmont.svg" alt="avatar" /></div>
       </header>
       <div className="container">
          <main>
            { 
               chooseGif ?
                   gifs.map(gif => <GifChoose key={gif} src={gif} handleChoice={handleChoice}/>)
                :  chat.map(msg => <Chat key={msg.pic+msg.who} msg={msg} name={name} />)  
            }
             <div className="dummy"></div>
          </main>
          <form onSubmit={getGifs}>
            <input type="text" placeholder="Type a message..."   onChange={handleTyping} /> <button type="submit"  disabled="">💥</button></form>
       </div>
    </div>
  );
}

export default App;
