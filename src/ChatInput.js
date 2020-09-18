import React, { useState } from 'react'
import './ChatInput.css'
import { useStateValue } from './StateProvider';

var socket = new WebSocket("ws://localhost:8080/myapp");
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();


    const sendMessage = e => {
        e.preventDefault();
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(input);
        } else {
            alert("The socket is not open.");
        }
        return false;
        
        // if(channelId) {
        //     db.collection('rooms').doc(channelId).collection({
        //     messages: input,
        //     timestamp: firebase.firestore.FieldValue.server.timestamp,
        //     user: user.displayName,
        //     userimage: user.photoURL,

        // })
        //}
    };
    return (
        <div className='chatInput'>
            <div id="chat" >
                
            </div>

            <form>
                <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Message #${channelName}`}/>
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
