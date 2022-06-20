import React, { useState, useEffect,useRef } from 'react';
import Chat from "./components/chat"
import GifChoose from "./components/gifChoose"
// import io from 'socket.io-client';
import './App.css';
import useChat from './components/useChat'

function App() {
  const bottomRef = useRef(null);
  const typingRef = useRef(null)
  const { messages, sendMessage } = useChat();
  const [typingMsg,setTypingMsg] = useState("");
  const [chooseGif,setChooseGif] = useState(false);
  const [gifs,setGifs] = useState([])
  const [name,setName] = useState("");
  // const [socket, setSocket] = useState(null);
 
  const getDomain = () => {
   const domain = window.location.hostname;
   if (domain === "localhost") {
    return "http://localhost:5017"
   } else {
    return "https://" + window.location.hostname;
   }
}
  


  useEffect(()=> {
   let you = prompt("your name?")
   setName(you)
   typingRef.current?.focus();
  },[])


  const handleChoice = (e) => {
    const gif = e.target.src;
    const newMessage = {
      pic: gif,
      who: name, 
      date: new Date()
    }
    sendMessage(newMessage);
    setChooseGif(false);
    setTypingMsg("")
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    // document.getElementById("typingThang").focus();
    typingRef.current?.focus();
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
          <div className="user-bio">
            { name ? <span>Hello <strong>{name}</strong></span> : ''}
          <img src="https://avatars.dicebear.com/api/initials/damianmont.svg" alt="avatar" /></div>
       </header>
       <div className="container">
          <main>
            { 
               chooseGif ?
                   gifs.map(gif => <GifChoose key={gif} src={gif} handleChoice={handleChoice}/>)
                :  messages.map(msg => <Chat key={msg.pic+msg.date} msg={msg} name={name} />)  
            }
             <div className="dummy"></div>
             <div ref={bottomRef} />
          </main>
          <form onSubmit={getGifs}>
            <input type="text" placeholder="Type a message..." ref={typingRef} id="typingThang" value={typingMsg}  onChange={handleTyping} /> <button type="submit"  disabled="">💥</button></form>
       </div>
    </div>
  );
}

export default App;
