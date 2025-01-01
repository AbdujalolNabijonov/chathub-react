import { Stack } from '@mui/material';
import React from 'react';
import ChatMenu from './screens/ChatPage';
import { Route, Routes } from "react-router-dom"
import "./css/mobile/index.css"
import "./css/pc/index.css"
import "./css/common.css"
import { Join } from './screens/JoinPage';

function App() {
  const device = "desktop"

  if (device === "desktop") {
    return (
      <Stack className='pc-wrap'>
        <Routes>
          <Route path='/chat' element={<ChatMenu />} />
          <Route path='/' element={<Join />} />
        </Routes>
      </Stack>
    )
  } else {
    return (
      <Stack className="mobile-wrap">
        <Routes>
          <Route path='/chat' element={<ChatMenu />} />
          <Route path='/' element={<Join />} />
        </Routes>
      </Stack>
    )
  }
}

export default App;
