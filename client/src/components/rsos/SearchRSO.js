import React, { useState, useContext, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import { RSOContext } from '../../context/RSOContext';
import RSOFinder from '../../apis/RSOFinder';

const options = [

  ];
  
  const SearchRSO = () => {
    const [selected, setSelected] = useState([]);
    // const { rsos, setRSOs } = useContext(RSOContext);

    // let navigate = useNavigate()
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await RSOFinder.get("/");
    //       setRSOs(response.data.data.rsos);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    //   fetchData();
    // }, [])
  
    return (
      <div className="container">
        <h1>Select RSOs</h1>
        <pre style={{ display: "none" }}>{JSON.stringify(selected)}</pre>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
    );
  };  

export default SearchRSO