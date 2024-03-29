import React, { useState, useEffect } from 'react';

import { MultiSelect } from "react-multi-select-component";

function MultiSelectRSO({ options }) {
    const [selectedValues] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {}, [options]);
    return (
        <>
            <h1>Select RSOs: </h1>
            <pre style={{ display: "none" }}>{JSON.stringify(selected)}</pre>
            <MultiSelect
                 options={options}
                 value={selected}
                 onChange={setSelected}
                 labelledBy="Select"
            />
        </>
    );
}

export default MultiSelectRSO