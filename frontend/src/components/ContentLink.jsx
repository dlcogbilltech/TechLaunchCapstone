function ContentLink({ content }) {
    return (
    <div className="contentLink">
        <div className="contentLinkThumb">
            <img className="contentLinkImg" src={content.thumbnail} alt={content.title}/>
            <div className="linkTextContainer">
                <p className="linkText">Likes: {content.likes.length}</p>
                <p className="linkText">Comments: {content.comments.length}</p>
            </div>
        </div>        
        <a href={`http://localhost:5173/contents/${content._id}`}>{content.title}</a>
    </div>
    );
}

export default ContentLink;