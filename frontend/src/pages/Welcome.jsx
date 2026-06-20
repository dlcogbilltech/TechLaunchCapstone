import { Link, useLocation } from 'react-router-dom';
import ContentLink from '../components/ContentLink';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProjectHome({ loggedIn, setLoggedIn }) {
    const [user,setUser] = useState(null);
    const [contents, setContents] = useState(null);
    const location = useLocation();

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
        if (location.hash) {
            const element = document.querySelector(location.hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
    }, [ loggedIn, location ]);
    
    return (
    <div>
        <div className="aboutMe">
            <img src="/animeD.png" alt="AnimeProfile Picture"/>
            <div className="aboutMeText">
                <h2 id='about_me'>About Me</h2>
                <p>I am a certified and dedicated IT and Helpdesk professional with a strong background in technical support and operations with a passion for software developing. My experience spans across various industries, where I have consistently delivered high-quality results through effective problem-solving and collaboration. When the day is done, I like to enjoy anime, video games, crime shows, music, reading, and a little skateboarding. Some of my favorite shows are Bleach, Black Clover, Naruto, Law & Order: SVU, Criminal Minds, and The Walking Dead. My go to movies are Vampire Hunter: D, Goodfellas, Casino, Rurouni Kenshin: Trust & Betrayal, Afro Samurai, Teenage Mutant Ninja Turtles, Fresh, The Five Heartbeats, The Matrix, and The Hurricane. My musical taste spans across the spectrum including old school R&B like Marvin Gaye and The Commodores, 2000s rap like Juelz Santana and Lil Wayne, Chopped & Screwed, Baltimore Club Music, and even a little bit of Rage Against the Machine when the time is right. My favorite authors are James Patterson and Micheal Crichton. I am a fan of action adventure games like Zelda, and I am currently playing Genshin Impact.</p>
                <p>I am currently CompTIA A+ and Network+ certified and an AWS Certified Cloud Practitioner with a projected completion of requirements for the CompTIA Security+ and Google IT Support certifications in May 2026. I am also enrolled in the Tech Launch program at the Tech Foundry in Springfield where I am developing hands-on experience in Active Directory, system troubleshooting, and network fundamentals. Through practical labs and real-world scenarios, I have built a strong foundation in resolving technical issues and supporting users.</p>
            </div>
        </div>
        <h2 id='certifications'>Certifications</h2>
        <div className="certifications">
            <img
                className="certificationImg"
                src="/certs/google.png"
                alt="Google IT Support ProfessionalCertification"
                title="Google IT Support ProfessionalCertification"
            />
            <img
                className="certificationImg"
                src="/certs/networkPlus.png"
                alt="CompTIA Network+ Certification"
                title="CompTIA Network+ Certification"
            />
            <img
                className="certificationImg"
                src="/certs/aPlus.png"
                alt="CompTIA A+ Certification"
                title="CompTIA A+ Certification"
            />
            <img
                className="certificationImg"
                src="/certs/cloudPractitioner.png"
                alt="AWS Certified Cloud Practitioner"
                title="AWS Certified Cloud Practitioner"
            />
        </div>
        <h2 id='education'>Education</h2>
        <div className="educationList">
            <div className="educationItem">
                <img
                    className="educationImg"
                    src="/education/techFoundry.png"
                    alt="Tech Foundry Logo"
                    title="Tech Foundry Logo"
                />
                <div className="educationText">
                    <h3>Tech Foundry</h3>
                    <h4>Tech Launch Program</h4>
                    <h4>Springfield, MA</h4>
                    <p>Currently a student-member of the Tech Launch hands-on IT support and workforce training program where I am developing experience in Windows administration, computer networking, hardware troubleshooting, and endpoint security . Ultimately, complete a final project and Google IT Support Professional Certificate, and intern with an employer partner.</p>
                </div>
            </div>
            <div className="educationItem">
                <img
                    className="educationImg"
                    src="/education/mcdi.png"
                    alt="Massachusetts Career Development Institute Logo"
                    title="Massachusetts Career Development Institute Logo"
                />
                <div className="educationText">
                    <h3>Massachusetts Career Development Institute</h3>
                    <h4>IT Workforce Training Program</h4>
                    <h4>Springfield, MA</h4>
                    <p>IT training program at Massachusetts Career Development Institute that included an internship with PC Warehouse as a Repair technician in West Springfield, MA. Building PCs, software installations, hardware installations/removals, virus removal, customer support and troubleshooting and acquiring CompTIA A+ and Network+ certification</p>
                </div>
            </div>
        </div>
        <h2 id='projects'>Projects</h2>
        <div className="contentLinkContainer" >
            {contents?.map((content) => (
                <div key={content._id}>
                    {content ? <ContentLink content={content} /> : <p>Loading</p> }
                </div>
            ))}
        </div>
        <p>This capstone project involved designing, developing, and deploying a professional profile web application using the MERN stack (MongoDB, Express.js, React, and Node.js) on a Raspberry Pi. The application serves as a personal portfolio and professional profile platform, showcasing skills, projects, education, certifications, and contact information through a responsive and user-friendly interface.</p>
        <p>The frontend was built with React to provide a dynamic user experience, while the backend utilized Node.js and Express.js to handle API requests and data management. MongoDB was used as the database to store profile information and project details. After development and testing, the application was deployed on a Raspberry Pi configured as a self-hosted web server, demonstrating the ability to host full-stack applications on low-cost, energy-efficient hardware.</p>
        <p>The project emphasized full-stack development, Linux system administration, network configuration, deployment automation, and cybersecurity best practices. By successfully hosting the application on a Raspberry Pi, the project showcased practical skills in web development, server management, and edge computing while providing a scalable and accessible professional online presence.</p>
        <Link to="/contents"><h1>Welcome!</h1></Link>
    </div>
    );
}

export default ProjectHome;