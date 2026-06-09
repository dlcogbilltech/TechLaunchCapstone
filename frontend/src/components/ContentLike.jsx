import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';

function ContentLike( content ) {
    const [commented,setCommented] = useState(false);
    const [liked,setLiked] = useState(false);
    const [newContent,setNewContent] = useState(content);
    const [comment,setComment] = useState("");
    const [errors,setErrors] = useState(null);

    let payload = {};
      useEffect(() => {
        try {
          console.log(Cookies.get('userToken'));
          const userToken = Cookies.get('userToken');
          
          if (userToken) {
              payload = jwt(userToken);
              console.log(payload);

              if ( content.likes.includes(payload._id) ) {
                  setLiked(true);
              }
              if (content.comments.some( comment => comment.author === payload._id )) {
                  setCommented(true);
              }
          } else {
              throw "no token";
          }
      }
      catch (err) {
          console.log(err);
      }
    },[]);

    const handleLike = () => {
        setNewContent({ ...content, likes: [...content.likes, payload._id] });
        setLiked(true);

        axios
            .put(`http://localhost:5000/api/contents/${content._id}`, newContent, {withCredentials: true})
            .then((response) => {
                navigate('/contents/' + content._id);
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            });
    };

    const handleComment = () => {
        setContent({ ...content, comments: [...content.comments, { author: payload._id, comment: comment }] });
        setCommented(true);

        axios
            .put(`http://localhost:5000/api/contents/${content._id}`, content, {withCredentials: true})
            .then((response) => {
                navigate('/contents/' + content._id);
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            });
    }

    return (
        <div className="contentLike">
            <div>
                <div>
                    { liked ? 
                        <BsHandThumbsUpFill disabled/>:
                        <BsHandThumbsUp onClick={handleLike}/>
                    }
                    { content.likes ? <p>{content.likes.length}</p> : <p></p>}
                </div>
                <div>
                    { commented ? 
                        <FaCommentAlt disabled/>:
                        <FaRegCommentAlt onClick={handleComment}/>
                    }
                    {content.comments ? <p>{content.comments.length}</p> : <p>No comments</p> }
                </div>
            </div> 
            <div>
                <Form.Label>Leave a comment:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={comment}
                    onChange={ (e) => setComment(e.target.value) }/>
                <Button variant="primary" onClick={handleComment}>
                    Submit Comment
                </Button>
            </div>
        </div>
    );
}
export default ContentLike;