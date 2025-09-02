import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Discover from './pages/Discover.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Playlist from './pages/Playlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>

    <Provider store={store}>

 <Routes>
    <Route path="/*" element={<App />} >
      <Route index element={<Home />} />
      <Route path="discover" element={<Discover/>} />
      <Route path="playlist" element={<Playlist/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup/>} />
    </Route>
   

 </Routes>

    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
