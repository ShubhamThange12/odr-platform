// src/components/CaseManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaseManagement = () => {
    const [cases, setCases] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCases = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/cases', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCases(response.data);
        };
        fetchCases();
    }, []);

    const handleCreateCase = async () => {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/cases', { title, description }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTitle('');
        setDescription('');
        // Refresh cases after creating a new one
        const response = await axios.get('http://localhost:5000/api/cases', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCases(response.data);
    };

    return (
        <div className="container">
            <h2>Case Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleCreateCase}>Create Case</button>
            </div>
            <h3>Existing Cases</h3>
            <ul>
                {cases.map((caseItem) => (
                    <li key={caseItem.id}>{caseItem.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CaseManagement;
