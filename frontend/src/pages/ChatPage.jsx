// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

import { ChatState } from "../context/ChatProvider"

const ChatPage = () => {
  const {user} = ChatState()

  return (
    <div>
       {user.name}
    </div>
  )
}

export default ChatPage
