import React, { createContext, useState } from 'react'

export const RSOContext = createContext();

export const RSOContextProvider = (props) => {
    const [rsos, setRSOs] = useState([]);
    
    return (
        <RSOContext.Provider value={{rsos, setRSOs}}>
            {props.children}
        </RSOContext.Provider>
    )
}