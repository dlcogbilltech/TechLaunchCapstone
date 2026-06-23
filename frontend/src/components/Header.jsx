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
            <img className="profilePicImg" src="/profileThumb.png" alt="Profile Thumbnail"/>
            <div className="headerLinks">
                <div className="contactLinks">
                    <a href="mailto:dlcogbilltech@gmail.com" target="_blank" rel="noopener noreferrer">dlcogbilltech@gmail.com</a>
                    <a href="https://www.linkedin.com/in/dlcogbilltech/" target="_blank" rel="noopener noreferrer">LinkedIn: dlcogbilltech</a>
                    <div className="contactLinks">
                        <p>GitHub: </p>
                        <div className="githubLinks">
                            <a href="https://github.com/dlcogbilltech" target="_blank" rel="noopener noreferrer">dlcogbilltech</a>
                            <a href="https://github.com/dlcogbill" target="_blank" rel="noopener noreferrer">dlcogbill</a>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <p className="nameTag">David Lee Cogbill</p>
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
                
                
            </div>            
        </div>
    );
}
export default Header;