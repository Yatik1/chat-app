import "./styles.css";

import { Box, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { IconButton , Spinner , useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./misc/ProfileModal";
import { ChatState } from "../context/ChatProvider";
import UpdateGroupChatModal from "./misc/UpdateGroupChatModal"
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const { selectedChat, setSelectedChat, user } =  ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

    } catch (error) {
       toast({
          title: "Error Occured!",
          description: "Failed to Load the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
    }
  }

  const sendMessage = async (event) => {
     if(event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers : {
            "Content-Type":"application/json",
            Authorization : `Bearer ${user.token}`
          }
        }

        setNewMessage("")
        const {data} = await axios.post("/api/message" , {
           content:newMessage,
           chatId:selectedChat._id
          } , 
            config
        )

        setMessages([...messages , data])

      } catch (error) {
         toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
     }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  }  

  useEffect(() => {
    fetchMessages()
  } , [selectedChat])

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
                    fetchMessages={fetchMessages}
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
              <div className="messages">
                 <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
          </FormControl>
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