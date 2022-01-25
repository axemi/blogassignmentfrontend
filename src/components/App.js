import React, { useEffect } from "react"
import '../styles/App.css';
import Topbar from '../components/topbar'
import ContentBox from '../components/content';
import SideMenu from './sidemenu';
import LoginPopup from "./loginform";
import {BACKEND_URL} from "../utils"

function App() {
  const [currentUser, setCurrentUser] = React.useState()
  const [loginPopupOpen, setLoginPopupOpen] = React.useState(false)
  const [fullpostboxPopupOpen, setFullPostboxPopupOpen] = React.useState(false)
  const [currentSelected, setCurrentSelected] = React.useState("Browse")
  const [posts, setPosts] = React.useState([])
  useEffect(async () => {
    try {
      console.log(BACKEND_URL)
      if (currentSelected === "Browse") {
        let response = await fetch(`${BACKEND_URL}/posts`)
        response = await response.json()
        setPosts(response.posts)
      }
      if (currentSelected === "My Posts") {
        let response = await fetch(`${BACKEND_URL}/posts/${currentUser.username}`)
        response = await response.json()
        // setCurrentSelected("My Posts")
        setPosts(response.posts)
      }
    } catch (err) {
      console.log(err)
    }
  }, [currentSelected, currentUser, fullpostboxPopupOpen])
  return (
    <div className="App">
      <Topbar/>
      <div className="leftside-content">
        <SideMenu currentSelected={currentSelected} setCurrentSelected={setCurrentSelected} currentUser={currentUser} loginPopupOpen={loginPopupOpen} setLoginPopupOpen={setLoginPopupOpen}/>
      </div>
      <ContentBox posts={posts} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected} currentUser={currentUser} fullpostboxPopupOpen={fullpostboxPopupOpen} setFullPostboxPopupOpen={setFullPostboxPopupOpen}/>
      <LoginPopup isOpen={loginPopupOpen} setLoginPopupOpen={setLoginPopupOpen} setCurrentUser={setCurrentUser} setCurrentSelected={setCurrentSelected}/>
    </div>
  );
}

export default App;
