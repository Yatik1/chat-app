import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Login, SignUp } from "../components";
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const user= JSON.parse(localStorage.getItem("userInfo"))

    if (user) navigate("/chats")
    
  } , [navigate])


  return (
    <Container maxW="xl" centerContent>
    <Box
      display="flex"
      justifyContent="center"
      p={3}
      fontWeight='bold'
      w="100%"
      m="40px 0 15px 0"
    >
      <Text fontSize="4xl">
        Chazily 🔥
      </Text>
    </Box>
    <Box 
      w="100%" 
      p={4} 
      borderRadius="3xl" 
      border='1px'
      borderColor='gray.300'
      >
      <Tabs size='md' isFitted variant="soft-rounded">
        <TabList mb="1em" p={1}>
          <Tab mr={2}
            _selected={{ color: 'white', bg: 'blue.500' }}
            _hover={{ color: 'white', bg: 'blue.500' }}
          >Login</Tab>

          <Tab
            _selected={{ color: 'white', bg: 'blue.500' }}
            _hover={{ color: 'white', bg: 'blue.500' }}
          >Sign Up</Tab>
        </TabList>

        <TabPanels>

          <TabPanel>
             <Login />
          </TabPanel>

          <TabPanel>
             <SignUp />
          </TabPanel>

        </TabPanels>

      </Tabs>
    </Box>
  </Container>
  )
}

export default Home
