import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import Manager from './pages/manager'
const App: React.FC = () => {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Manager />} />
      </Routes>
    </BrowserRouter>
  </>)
}
export default App
