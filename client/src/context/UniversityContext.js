import React, { createContext, useState } from 'react'

export const UniversityContext = createContext();

export const UniversityContextProvider = (props) => {
    const [unis, setUnis] = useState([]);
    
    return (
        <UniversityContext.Provider value={{unis, setUnis}}>
            {props.children}
        </UniversityContext.Provider>
    )
}