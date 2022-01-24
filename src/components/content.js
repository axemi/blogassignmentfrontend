import '../styles/contentbox.css'
import '../styles/App.css';
import Postbox, {FullPostbox} from './postbox';
import React from "react"
function ContentBox({posts}) {
    const [selectedPostId, setSelectedPostId] = React.useState()
    const [fullpostboxPopupOpen, setFullPostboxPopupOpen] = React.useState(false)
    return (
        <div className="contentbox">
            {posts.map(post => {
                return (
                    <Postbox key={post.id} postid={post.id} title={post.title} body={post.content} author={post.userid} setSelectedPostId={setSelectedPostId} setFullPostboxPopupOpen={setFullPostboxPopupOpen}/>
                )
            })}
            {selectedPostId > 0 && fullpostboxPopupOpen ? <div className="login-popup-container"><FullPostbox key={selectedPostId} setFullPostboxPopupOpen={setFullPostboxPopupOpen} title={posts[selectedPostId-1].title} body={posts[selectedPostId-1].content} author={posts[selectedPostId-1].userid} postid={posts[selectedPostId-1].id}/></div> : null}
        </div>
    )
}

export default ContentBox