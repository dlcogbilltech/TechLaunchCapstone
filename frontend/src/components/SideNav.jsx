import { Link } from 'react-router-dom';

function SideNav() {
    
    return (
        <div className="sideNav">
            <Link to="/#about_me">About Me</Link>
            <Link to="/#certifications">Certifications</Link>
            <Link to="/#education">Education</Link>
            <Link to="/#projects">Projects</Link>
        </div>
    );
}
export default SideNav; 