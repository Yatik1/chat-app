import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {

  const [chats,setChats] = useState([])

  useEffect(() => {
    
  const fetchChats = async () => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/chats")
      setChats(data)
    }  catch (error) {
      console.log("Error occured during data fetch" , error)
    } 
  }
  
     fetchChats();
  } ,[]) 

  return (
    <div>
       {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
       ))}
    </div>
  )
}

export default ChatPage
