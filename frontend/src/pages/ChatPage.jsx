import { Box } from "@chakra-ui/layout";

import { ChatState } from "../context/ChatProvider"
import { ChatBox, MyChats, SideDrawer } from "../components";

const ChatPage = () => {
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
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>

    </div>
  )
}

export default ChatPage
