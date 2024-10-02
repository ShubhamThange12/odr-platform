import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful!');
            navigate('/profile');
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.response ? error.response.data.error : 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
        </div>
    );
};

export default Login;
