import logo from './logo.svg';
import './normal.css';
import './App.css';
import { useState } from 'react';


function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  },{
    user: "me",
    message: ""
  }]);
  function clearChat(){
    setChatLog([]);
  }
  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}`} ]
    await setInput("");
    await setChatLog(chatLogNew)
    const messages = chatLogNew.map((message)=> message.message).join("\n");
    const response = await fetch ("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messages,
        })
    });
    const data = await response.json();
    await setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
    
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat  
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message}/>
          ))}
        
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
          <input 
          rows="1"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          className="chat-input-textarea"></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({message}) =>{   
  return(
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
          <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
            
            </div>
            <div className="message">
                {message.message}
            </div>
          </div>
        </div>
  )
}

export default App;
