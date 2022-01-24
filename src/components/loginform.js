import '../styles/App.css';
import React from "react"
function LoginPopup(props) {
    const [tabSelected, setTabSelected] = React.useState("Login Existing User")
    let isOpen = props.isOpen
    let tabs = ["Login Existing User", "Create New User"]
    const handleTabSelected = name => event => {
        setTabSelected(name)
    }
    if (isOpen) {
        return (
        <div className="login-popup-container">
            <div className="login-popup">
                <div className="login-popup-header">
                    <span className="login-popup-close" onClick={() => props.setLoginPopupOpen(false)}>Close</span>
                </div>
                <div className='login-popup-tabs'>
                    {tabs.map(tab => {
                        return <button className={tab === tabSelected ? "login-popup-tab-selected" : "login-popup-tab"} onClick={handleTabSelected(tab)}>{tab}</button>
                    })}
                </div>
                {tabSelected === "Login Existing User" ? <LoginForm setCurrentSelected={props.setCurrentSelected} setLoginPopupOpen={props.setLoginPopupOpen} setCurrentUser={props.setCurrentUser}/> : <SignUpForm setLoginPopupOpen={props.setLoginPopupOpen} setCurrentUser={props.setCurrentUser} setCurrentSelected={props.setCurrentSelected}/>}
            </div>
        </div>
        )
    } else {
        return null
    }
}

function LoginForm(props) {
    const [isValid, setisValid] = React.useState(true)
    const onLoginSubmit = async event => {
        event.preventDefault()
        try {
            let response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: event.target.username.value,
                    password: event.target.pword.value
                })
            })
            console.log(response.status)
            if (response.status === 403) {
                setisValid(false)
                return false
            }
            response = await response.json()
            props.setCurrentUser(response)
            props.setLoginPopupOpen(false)
            props.setCurrentSelected("My Posts")
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form className='login-form' onSubmit={onLoginSubmit}>
                <div className='username-fields'>
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder='Username' name="username" required></input>
                </div>
                <div className='pword-fields'>
                    <label htmlFor="pword"><b>Password</b></label>
                    <input type="password" placeholder='Password' name="pword" required></input>
                </div>
                <button className="login-button" type='submit'>Login</button>
            </form>
            {isValid === false ? <div className='login-form-error'>Invalid Credentials</div> : null}
        </div>
    )
}

function SignUpForm(props) {
    const [isValid, setisValid] = React.useState(true)
    const onSubmit = async event => {
        event.preventDefault()
        if (event.target.pword.value !== event.target.rpword.value) {
            setisValid(false)
            return false
        }
        try {
            let response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: event.target.firstname.value,
                    last_name: event.target.lastname.value,
                    username: event.target.username.value,
                    password: event.target.pword.value
                })
            })

            response = await response.json()
            props.setCurrentUser(response)
            props.setLoginPopupOpen(false)
            props.setCurrentSelected("My Posts")
        } catch (err) {
            console.log(err)
        }

        //check if username exists
    }
    return (
        <div>
            <form className='signup-form' onSubmit={onSubmit}>
                <div className='name-fields'>
                    <label htmlFor="firstname"><b>First Name</b></label>
                    <input type="text" placeholder='First Name' name="firstname" required></input>
                    <label htmlFor="lastname"><b>Last Name</b></label>
                    <input type="text" placeholder='Last Name' name="lastname" required></input>
                </div>
                <div className='username-fields'>
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder='Username' name="username" required></input>
                </div>
                <div className='pword-fields'>
                    <label htmlFor="pword"><b>Password</b></label>
                    <input type="password" placeholder='Password' name="pword" required></input>
                </div>
                <div className='rpword-fields'>
                    <input type="password" placeholder='Repeat Password' name="rpword" required></input>
                </div>
                <button className="login-button" type='submit'>Signup</button>
            </form>
            {isValid === false ? <div className='login-form-error'>Passwords do not match</div> : null}
        </div>
    )
}

export default LoginPopup