import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                password,
                role,
            });
            setMessage('Registration successful! You can now log in.');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
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
                <div className="mb-3">
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                        <option value="client">Client</option>
                        <option value="lawyer">Lawyer</option>
                        <option value="mediator">Mediator</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
        </div>
    );
};

export default Register;
