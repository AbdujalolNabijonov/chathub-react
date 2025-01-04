import { Stack } from '@mui/material';
import React from 'react';
import ChatMenu from './screens/ChatPage';
import { Route, Routes } from "react-router-dom"
import Login from './screens/JoinPage';
import SignUp from './screens/JoinPage/signup';
import useDeviceDetect from './hooks/useDeviceDetect';
import "./css/mobile/index.css"
import "./css/pc/index.css"
import "./css/common.css"

function App() {
  const device = useDeviceDetect()

  if (device === "desktop") {
    return (
      <Stack className='pc-wrap'>
        <Routes>
          <Route path='/chat' element={<ChatMenu />} />
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Stack>
    )
  } else {
    return (
      <Stack className="mobile-wrap">
        <Routes>
          <Route path='/chat' element={<ChatMenu />} />
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Stack>
    )
  }
}

export default App;
