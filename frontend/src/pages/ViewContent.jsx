import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import ContentItem from '../components/ContentItem';

function ViewContent({ loggedIn }) {
    const { id } = useParams();
    const [content,setContent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/contents/${id}`, {}, { withCredentials: true })
                .then((response) =>{
                    console.log(response.data);
                    setContent(response.data);
                })
                .catch((error) => {
                    console.log('Error in get content', error);
                })
    },[]);
    
    return (
        <div>
            {content ? <ContentItem content={content} /> : <p>Loading</p> }
        </div>
    )
}

export default ViewContent;