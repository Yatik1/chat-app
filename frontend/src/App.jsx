import React from 'react'
// import { Button } from '@chakra-ui/react'
import {Routes ,Route} from "react-router-dom"
import { ChatPage, Home } from './pages'
const App = () => {
  return (
    <div className='bg-blue-950 h-screen text-white'>
        {/* <Button colorSchema='whiteAlpha'>Button</Button> */}

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
    </Routes>

    </div>
  )
}

export default App
