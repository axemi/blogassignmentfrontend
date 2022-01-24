import '../styles/App.css';
import React from "react"
function SideMenu({loginPopupOpen,setLoginPopupOpen, currentUser, currentSelected, setCurrentSelected}) {
    let buttonNames = ["Browse", "My Posts", "Create Post"]
    const handleLoginButtonClick = () => {
        loginPopupOpen === true ? setLoginPopupOpen(false) : setLoginPopupOpen(true)
    }

    const handleChangeSelected = (name) => event => {
        setCurrentSelected(name)
    }
    return (
        <div className="sidemenu-container">
            {currentUser !== undefined ? <div>{currentUser.username}</div> : <button className="sidemenu-button sidemenu-login-button" onClick={handleLoginButtonClick}>Login<br/>or Signup</button>}
            <div className="sidemenu-divider"/>
            {buttonNames.map(name => {
                return <button className={name === currentSelected ? 'sidemenu-button-selected': "sidemenu-button"} onClick={handleChangeSelected(name)}>{name}</button>
            })}
        </div>
    )
}

export default SideMenu