import React, { Fragment, useState,useEffect }from 'react';
import UserFinder from '../../apis/UserFinder'
import Select from 'react-dropdown-select';
import UniversityFinder from '../../apis/UniversityFinder';

const SelectUniversity = () => {
    const [university_id, setUniversity] = useState("1");
    const option = item => ({ label: item.name, value: item.university_id });
  
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await UniversityFinder.get("/");
            setUniversity(response.data.data.universities.map(option));
            console.log(response);
        } catch (err) {
            console.error(err);
        }
        };
        fetchData();
    }, [])
}


export default SelectUniversity;