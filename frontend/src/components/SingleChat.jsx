// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";

import { ChatState } from "../context/ChatProvider";


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  // const [messages, setMessages] = useState([]);
  // const [loading, setLoading] = useState(false);
 
  // const toast = useToast();


  const { selectedChat, setSelectedChat, user } =  ChatState();



  return (
    <>
      {selectedChat ? (
        <>
          A chat is selected 
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