import '../styles/contentbox.css'
import React from "react"
function Postbox({postid, title, body, authorid, setSelectedPostId, setFullPostboxPopupOpen}) {
    const onClick = () => {
        console.log(postid)
        setSelectedPostId(postid)
        setFullPostboxPopupOpen(true)
    }
    return (
        <div>
            <div className="postbox" onClick={onClick}>
                <div className="postboxTitle">{title}</div>
                {body.length >= 100 ? <div className="postboxBody">{body.slice(0, 100) + "..."}</div> : <div className="postboxBody">{body}</div>}
                <div className="postboxAuthor">by {authorid}</div>
            </div>
        </div>
    )
}

export function FullPostbox({postid, title, body, authorid, setFullPostboxPopupOpen, currentUser, setCurrentSelected}) {
    //edit mode state updated by edit button
    const [editMode, setEditMode] = React.useState(false)
    const onEditClick = event => {
        setEditMode(true)
    }
    const onDeleteClick = async event => {
        event.preventDefault()
        try {
            //post to api/posts
            let response = await fetch("http://localhost:3000/posts", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    userid: currentUser.userid,
                    postid: postid,
                    authorid: authorid
                })
            })
            if (response.status === 200) {
                setCurrentSelected("My Posts")
                setFullPostboxPopupOpen(false)
            }
        } catch(err) {
            console.log(err)
        }
    }
    //handleClose to switch edit mode back to false and set fullpostboxpopupopen to false
    const onClose = event => {
        setEditMode(false)
        setFullPostboxPopupOpen(false)
    }
    return (
        <div>
            <div className="full-postbox">
                <div className='full-postboxHeader'>
                    <span className="login-popup-close" onClick={onClose}>Close</span>
                    {currentUser && currentUser.userid === authorid ? <span className="login-popup-close" onClick={onEditClick}>Edit</span> : null}
                    {currentUser && currentUser.userid === authorid ? <span className="login-popup-close" onClick={onDeleteClick}>Delete</span> : null}
                    {/* <span className="login-popup-close" onClick={onEditClick}>Edit</span> */}
                    {/* <span className="login-popup-close" onClick={onDeleteClick}>Delete</span> */}
                </div>
                {editMode === true ? <EditPostBox currentUser={currentUser} postid={postid} title={title} body={body} authorid={authorid} setEditMode={setEditMode}/> 
                :
                <div>
                    <div className="full-postboxTitle">{title}</div>
                    <div className="full-postboxBody">{body}</div>
                    <div className="full-postboxAuthor">by {authorid}</div>
                </div>
                }   
            </div>
        </div>
    )
}

function EditPostBox({postid, title, body, currentUser, setEditMode, authorid}) {
    //onSave - put to /posts
    const onSave = async event => {
        event.preventDefault()
        try {
            //post to api/posts
            let response = await fetch("http://localhost:3000/posts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    title: event.target.title.value,
                    content: event.target.body.value,
                    userid: currentUser.userid,
                    postid: postid,
                    authorid: authorid
                })
            })
            if (response.status === 200) {
                setEditMode(false)
                // setCurrentSelected("My Posts")
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form className="create-postbox-form" onSubmit={onSave}>
                <div className="create-postbox-form-title">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" placeholder="Title" name="title" defaultValue={title} required></input>
                </div>
                <div className="create-postbox-form-body">
                    <label htmlFor="body"><b>Body</b></label>
                    <textarea className="create-postbox-form-body-textarea" name="body" rows={5} maxLength={255} defaultValue={body}></textarea>
                </div>
                <button className="create-postbox-button" type="submit">Save</button>
            </form>
        </div>
    )
}

export function CreateNewPostbox({currentUser, setCurrentSelected}) {
    const onSubmit = async event => {
        event.preventDefault()
        try {
            //post to api/posts
            let response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    title: event.target.title.value,
                    content: event.target.body.value,
                    userid: currentUser.userid
                })
            })
            if (response.status === 200) setCurrentSelected("My Posts")
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form className="create-postbox-form" onSubmit={onSubmit}>
                <div className="create-postbox-form-title">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" placeholder="Title" name="title" required></input>
                </div>
                <div className="create-postbox-form-body">
                    <label htmlFor="body"><b>Body</b></label>
                    {/* <input type="text" placeholder="Body" name="body" required></input> */}
                    <textarea className="create-postbox-form-body-textarea" name="body" rows={5} maxLength={255}></textarea>
                </div>
                <button className="create-postbox-button" type="submit">Create Post</button>
            </form>
        </div>
    )
}
export default Postbox