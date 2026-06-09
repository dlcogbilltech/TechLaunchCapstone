import ContentLink from './ContentLink';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Header({ loggedIn, setLoggedIn }) {
    const [user,setUser] = useState(null);
    const [contents, setContents] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/contents')
            .then((response) =>{
                setContents(response.data);
            })
            .catch((error) => {
                console.log('Error in get contents', error);
            })
        const userToken = Cookies.get('userToken');
        if (userToken) {
            const user = jwtDecode(userToken);
            setUser(user);
            setLoggedIn(true);
            console.log(user);
        } else {
            setLoggedIn(false);
            setUser(null);
        }
    }, [loggedIn]);

    const handleLogout = () => {
        axios
            .post('http://localhost:5000/logout', {}, { withCredentials: true})
            .then((response) => {
                Cookies.remove('userToken');
                setUser(null);
                setLoggedIn(false);
            })
            .catch((error) => {
                console.log('Logout error', error);
            })
    };
        
    return (
        <div className="header">
            <div className="contentLinkContainer">
                {contents?.map((content) => (
                    <div key={content._id}>
                        {content ? <ContentLink content={content} /> : <p>Loading</p> }
                    </div>
                ))}
            </div>
            {user ? (
                    <div className="userBox">
                        <p>Welcome Back {user.firstName} {user.lastName}</p>
                        <p><Button className="formButton" onClick={handleLogout} >Logout</Button></p>
                    </div>
                ) : (
                    <div className="userBox">
                        <p>Log in</p>
                    </div>
                )}
        </div>
    );
}
export default Header;