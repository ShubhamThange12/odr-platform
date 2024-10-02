import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container text-center my-5">
            <h1 className="display-4">Welcome to the ODR Platform</h1>
            <p className="lead">This is the home page.</p>
            <nav>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
