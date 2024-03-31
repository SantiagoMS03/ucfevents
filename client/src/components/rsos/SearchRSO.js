import React, { useContext, useEffect } from "react";
import RSOFinder from '../../apis/RSOFinder';
import { RSOContext } from '../../context/RSOContext';
import MultiSelectRSO from "./MultiSelectRSO";

  const SearchRSO = () => {
    const {rsos, setRSOs} = useContext(RSOContext);
    const option = item => ({ label: item.name, value: item.rso_id });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await RSOFinder.get("/");
          setRSOs(response.data.data.rsos.map(option));
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, [])
  
    return (
      <div className="container">
        <div>
          <MultiSelectRSO options={rsos}></MultiSelectRSO>
        </div>
      </div>
    );
  };  

export default SearchRSO
