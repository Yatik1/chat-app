import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';
import { Spinner } from "@chakra-ui/spinner";
import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { SearchIcon ,BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Input } from "@chakra-ui/input";

import NotificationBadge from 'react-notification-badge';
// import {CustomEffect} from 'react-notification-badge';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

import axios from "axios";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from './ProfileModal';
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from '../ChatLoading';
import UserListItem from "../userAvatar/UserListItem"
import { getSender } from '../../config/ChatLogics';


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user , setSelectedChat,chats,setChats,notification , setNotification} = ChatState()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async () => { 
     if(!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
     }

     try {
      setLoading(true)
      const config = {
        headers : {
          Authorization: `Bearer ${user.token}`,
        }
      };

      const {data} = await axios.get(`https://chat-app-9flg.onrender.com/api/user?search=${search}` , config)

      setLoading(false)
      setSearchResult(data)

     } catch (error) {
       toast({
        title: "Error occured while searching",
        description:"Failed to load the search results " , 
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
       })
       console.log("Error during Search" , error);
     }
   }

  const accessChat = async (userId) => {
    console.log(userId);
     try {
       setLoadingChat(true)
       const config = {
         headers : {
           "Content-type" : "application/json",
           Authorization : `Bearer ${user.token}`,
         }
       }

       const {data} = await axios.post("https://chat-app-9flg.onrender.com/api/chat" , {userId} , config)
       console.log(data);
       if(!chats.find((c) => c._id === data._id)) setChats([data , ...chats]);
       setLoadingChat(false);
       setSelectedChat(data);
       
       onClose();
     } catch (error) {
      toast({
        title: "Error occured while fetching chats",
        description:error.message , 
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
       })
       console.log(error.message);
     }
  }

  return (
    <>
     <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
         <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
           <Button variant="ghost" onClick={onOpen}>
             <SearchIcon />
             <Text display={{ base: "none", md: "flex" }} px={4}>
               Search User
             </Text>
           </Button>
         </Tooltip>

         <Text fontSize="2xl">
            Chazily 🔥
         </Text>

         <div>
           <Menu>
             <MenuButton p={1}>
               <NotificationBadge 
                  count={notification.length}
                  // effect = {CustomEffect}
                />
               <BellIcon fontSize='2xl' m={1} />
             </MenuButton>
             <MenuList paddingX={2}>
               {!notification.length && "No new Messages "}
               
                  {notification.map((notify) => (
                      <MenuItem key={notify._id}
                                onClick={() => {
                                  setSelectedChat(notify.chat)
                                  setNotification(notification.filter((n) => n !== notify))
                                }}
                      >
                         {notify.chat.isGroupChat ? `New Message in ${notify.chat.chatName}`:`New Message from ${getSender(user,notify.chat.users)}`}
                      </MenuItem>
                  ))}
               
             </MenuList>
           </Menu>
           <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar 
                   size="sm"
                   cursor='pointer'
                   name={user.name}
                   src={user.pic}
                />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
           </Menu>

         </div>
     </Box>

     <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
  
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
                 onClick={handleSearch}
              >Go</Button>
            </Box>
             {loading ? (
               <ChatLoading />
             ) : (
              searchResult?.map((user) => (
                <UserListItem 
                    key={user._id}
                    user={user}
                    handleFunction = {() => accessChat(user._id)} />
              ))
             )}
             
             {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>  

        </DrawerContent>
     </Drawer>

    </>
  )
}

export default SideDrawer

