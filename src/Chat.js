import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom';
import { StarBorderOutlined, InfoOutlined } from "@material-ui/icons";
import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput'

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails ] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
                setRoomDetails(snapshot.data())
            ))
        }

        db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
            setRoomMessages(
                snapshot.docs.map(doc => doc.data())
            )
        )
    }, [roomId])

    console.log(roomDetails);
    console.log('MESSAGES >>> ', roomMessages);

    return (
        <div className="chat">
            <div className="chat_header">
                <div className="chat_headerLeft">
                    <h4 className="chat_channelName">
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlined/>
                    </h4>
                </div>
                <div className="chat_headerRight">
                    <p>
                    <InfoOutlined/> Details 
                    </p>
                </div>
            </div>
            <div className="chat_messages">
                {roomMessages.map(({message, 
                timestamp, user, userimage }) => (
                    <Message
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userimage={userimage}
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomDetails?.id}/>
        </div>
    )
}

export default Chat
