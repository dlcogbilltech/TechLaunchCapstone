import { Link } from 'react-router-dom';

function ProjectHome() {
    
    return (
    <div>
        <div className="welcomeFront">
            <p>This capstone project involved designing, developing, and deploying a professional profile web application using the MERN stack (MongoDB, Express.js, React, and Node.js) on a Raspberry Pi. The application serves as a personal portfolio and professional profile platform, showcasing skills, projects, education, certifications, and contact information through a responsive and user-friendly interface.</p>
            <p>The frontend was built with React to provide a dynamic user experience, while the backend utilized Node.js and Express.js to handle API requests and data management. MongoDB was used as the database to store profile information and project details. After development and testing, the application was deployed on a Raspberry Pi configured as a self-hosted web server, demonstrating the ability to host full-stack applications on low-cost, energy-efficient hardware.</p>
            <p>The project emphasized full-stack development, Linux system administration, network configuration, deployment automation, and cybersecurity best practices. By successfully hosting the application on a Raspberry Pi, the project showcased practical skills in web development, server management, and edge computing while providing a scalable and accessible professional online presence.</p>
            <Link to="/contents"><h1>Welcome!</h1></Link>
        </div>
    </div>
    );
}

export default ProjectHome;