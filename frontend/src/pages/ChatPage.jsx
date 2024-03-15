import { Box } from "@chakra-ui/layout";

import { ChatState } from "../context/ChatProvider"
import { ChatBox, MyChats, SideDrawer } from "../components";
import { useState } from "react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const {user} = ChatState()

  return (
    <div style={{width: "100%"}}>
       {/* {user.name}" */}
       {user && <SideDrawer />}
       <Box 
          display='flex'
          justifyContent='space-between'
          w="100%"
          height="91.5vh"
          padding="10">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>

    </div>
  )
}

export default ChatPage
