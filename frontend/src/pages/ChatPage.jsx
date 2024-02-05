// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { Box } from "@chakra-ui/layout";

import { ChatState } from "../context/ChatProvider"
import { ChatBox, MyChats, SideDrawer } from "../components";

const ChatPage = () => {
  const {user} = ChatState()

  return (
    <div style={{width: "100%"}}>
       {/* {user.name}" */}
       {user && <SideDrawer />}
       <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>

    </div>
  )
}

export default ChatPage
