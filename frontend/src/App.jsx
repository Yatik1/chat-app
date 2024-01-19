import React from 'react'
import {Routes ,Route} from "react-router-dom"
import { ChatPage, Home } from './pages'

const App = () => {
  return (
    <div className='bg-[whitesmoke] text-black h-screen w-full min-h-[100vh] flex'>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/chats" element={<ChatPage />} />
         </Routes>
    </div>
  )
}

export default App
