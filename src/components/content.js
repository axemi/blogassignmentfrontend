import '../styles/contentbox.css'
import '../styles/App.css';
import Postbox, {FullPostbox, CreateNewPostbox} from './postbox';
import React from "react"
function ContentBox({posts, currentSelected, setCurrentSelected, currentUser, fullpostboxPopupOpen, setFullPostboxPopupOpen}) {
    const [selectedPostId, setSelectedPostId] = React.useState()
    let post = posts.filter(post => post.id === selectedPostId)
    return (
        <div className="contentbox">
            {currentSelected === "Create Post" ? <CreateNewPostbox currentUser={currentUser} setCurrentSelected={setCurrentSelected}/> 
            :
            posts.sort((a,b) => b.id > a.id ? 1 : -1).map(post => {
                return (
                    <Postbox key={post.id} postid={post.id} title={post.title} body={post.content} authorid={post.userid} author={post.username} setSelectedPostId={setSelectedPostId} setFullPostboxPopupOpen={setFullPostboxPopupOpen}/>
                )
            })}
            {selectedPostId > 0 && fullpostboxPopupOpen ? <div className="login-popup-container"><FullPostbox key={selectedPostId} setCurrentSelected={setCurrentSelected} currentUser={currentUser} setFullPostboxPopupOpen={setFullPostboxPopupOpen} title={post[0].title} body={post[0].content} authorid={post[0].userid} author={post[0].username} postid={post[0].id}/></div> : null}
        </div>
    )
}

export default ContentBox