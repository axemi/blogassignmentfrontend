import '../styles/contentbox.css'
import React from "react"
function Postbox({postid, title, body, author, setSelectedPostId, setFullPostboxPopupOpen}) {
    const onClick = () => {
        console.log(`postbox ${postid} selected`)
        setSelectedPostId(postid)
        setFullPostboxPopupOpen(true)
    }
    return (
        <div>
            <div className="postbox" onClick={onClick}>
                <div className="postboxTitle">{title}</div>
                {body.length >= 100 ? <div className="postboxBody">{body.slice(0, 100) + "..."}</div> : <div className="postboxBody">{body}</div>}
                <div className="postboxAuthor">by {author}</div>
            </div>
        </div>
    )
}

export function FullPostbox({postid, title, body, author, setFullPostboxPopupOpen}) {
    return (
        <div>
            <div className="full-postbox">
                <div className='full-postboxHeader'>
                    <span className="login-popup-close" onClick={() => setFullPostboxPopupOpen(false)}>Close</span>
                    <span className="login-popup-close">Edit</span>
                </div>
                <div className="full-postboxTitle">{title}</div>
                <div className="full-postboxBody">{body}</div>
                <div className="full-postboxAuthor">by {author}</div>
            </div>
        </div>
    )
}
export default Postbox