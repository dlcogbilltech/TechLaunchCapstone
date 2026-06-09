function ContentLink({ content }) {
    return (
    <div className="contentLink">
        <img className="contentLinkImg" src={content.thumbnail} alt={content.title}/>
        <p>Likes: {content.likes.length}</p>
        <p>Comments: {content.comments.length}</p>
        <a href={`http://localhost:5173/contents/${content._id}`}>{content.title}</a>
    </div>
    );
}

export default ContentLink;