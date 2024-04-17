import React, { useEffect, useState } from 'react';
import AddUniversity from "../../components/Universities/AddUniversity";
import UniversityFinder from '../../apis/UniversityFinder';
import Header from '../../components/Header.js';
import { useNavigate, useParams } from "react-router-dom";

const UniversityDetailPage = () => {
    const { universityId } = useParams();
    let navigate = useNavigate();
    const [university, setUniversity] = useState(null);

    useEffect(() => {
        const fetchUniversityDetails = async () => {
            try {
                const response = await UniversityFinder.get(`/${universityId}`);
                setUniversity(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUniversityDetails();
    }, [universityId]);

    if (!university) {
        return <div>Loading...</div>;
    }
    
      const handleUniversitySelect = (universityId) => { 
        navigate(`/universities/${universityId}`);
      }
      return (
        <div>
        <Header />
        <div className="container">
            <h1 className="university-name">{university.name}</h1>
            <p className="university-description">{university.description}</p>
            <p className="university-info">Location: {university.location}</p>
            <p className="university-info">Student Count: {university.studentCount}</p>
        </div>
    </div>
);
    
}

export default UniversityDetailPage;
