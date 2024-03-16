import { Box, Text } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import { IconButton , Spinner} from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useState } from "react";
// import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./misc/ProfileModal";
import { ChatState } from "../context/ChatProvider";
import UpdateGroupChatModal from "./misc/UpdateGroupChatModal"

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [newMessage, setNewMessage] = useState("");

  const { selectedChat, setSelectedChat, user } =  ChatState();



  return (
    <>
      {selectedChat ? (
        <>
           <Text
            fontSize={{ base: "6.3vw", md: "2.5vw" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              )}
          </Text> 
           <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner 
              size="xl"
              w={20}
              h={20}
              alignSelf = "center"
              margin="auto"
              />
            ):(
              <div>
                Messages
              </div>
            )}
          </Box>
          <FormControl></FormControl>
        </>
      ) : (
        
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;