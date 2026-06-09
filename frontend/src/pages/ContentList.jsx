import {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import ContentItem from '../components/ContentItem';

function ContentList({ loggedIn }) {
    const [contents,setContents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/contents')
            .then((response) =>{
                setContents(response.data);
            })
            .catch((error) => {
                console.log('Error in get contents', error);
            })
    },[]);

    return (
    <div>
        <div className="contentList">
            {contents.map((content) => (
            <div className="contentListItem" key={content._id}>
                <div>
                    {content ? <ContentItem content={content} /> : <p>Loading</p> }
                </div>                
            </div>
            ))}
        </div>
    </div>
    )
}

export default ContentList;