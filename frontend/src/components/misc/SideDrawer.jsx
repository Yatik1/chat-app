// import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

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
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from './ProfileModal';


const SideDrawer = () => {

  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useStateeState(false);

  const {user} = ChatState()
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
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
           <Button variant="ghost" >
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
               <BellIcon fontSize='2xl' m={1} />
             </MenuButton>
             {/* <MenuList></MenuList> */}
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
    </>
  )
}

export default SideDrawer

