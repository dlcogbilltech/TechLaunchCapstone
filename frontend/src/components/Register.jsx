import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register({ setLoggedIn }) {
    const navigate = useNavigate();

    const [user,setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        _confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const registerUser = (user, setErrors) => {
        axios
            .post('http://localhost:5000/register', user, {
                withCredentials: true,
            })
            .then((response) => {
                setLoggedIn(true);
                console.log('Response', response.data );
                navigate('/contents');
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data.error.errors);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(user, setErrors);
    };

    const handleChange = (e) =>  {
        setUser({...user, [e.target.name]: e.target.value });
    }
    
    return (
    <div>
        <Form onSubmit={handleSubmit} className="postForm">
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        onChange={ handleChange }/>
                    {errors.firstName && <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        onChange={ handleChange }/>
                    {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter E-mail Address"
                        name="email"
                        onChange={ handleChange }/>
                    {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>
            </Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ handleChange }/>
                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="_confirmPassword"
                        onChange={ handleChange }/>
                    {errors._confirmPassword && <Form.Text className="text-danger">{errors._confirmPassword.message}</Form.Text>}
                </Form.Group>
            <Button className="formButton" variant="primary" type="submit">Register</Button>
        </Form>
    </div>
    );
}

export default Register;