import '../styles/contentbox.css'
import '../styles/App.css';
import Postbox, {FullPostbox, CreateNewPostbox} from './postbox';
import React from "react"
function ContentBox({posts, currentSelected, setCurrentSelected, currentUser}) {
    const [selectedPostId, setSelectedPostId] = React.useState()
    const [fullpostboxPopupOpen, setFullPostboxPopupOpen] = React.useState(false)
    let post = posts.filter(post => post.id === selectedPostId)
    return (
        <div className="contentbox">
            {currentSelected === "Create Post" ? <CreateNewPostbox currentUser={currentUser} setCurrentSelected={setCurrentSelected}/> 
            :
            posts.sort((a,b) => b.id > a.id ? 1 : -1).map(post => {
                return (
                    <Postbox key={post.id} postid={post.id} title={post.title} body={post.content} authorid={post.userid} setSelectedPostId={setSelectedPostId} setFullPostboxPopupOpen={setFullPostboxPopupOpen}/>
                )
            })}
            {selectedPostId > 0 && fullpostboxPopupOpen ? <div className="login-popup-container"><FullPostbox key={selectedPostId} setCurrentSelected={setCurrentSelected} currentUser={currentUser} setFullPostboxPopupOpen={setFullPostboxPopupOpen} title={post[0].title} body={post[0].content} authorid={post[0].userid} postid={post[0].id}/></div> : null}
        </div>
    )
}

export default ContentBox