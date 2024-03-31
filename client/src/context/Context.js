import React, { createContext, useState } from 'react'

export const Context = createContext();

export const ContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rsos, setRSOs] = useState([]);
    
    return (
        <Context.Provider value={{
                events, setEvents, 
                selectedEvent, setSelectedEvent,
                rsos, setRSOs}}>
            {props.children}
        </Context.Provider>
    )
}