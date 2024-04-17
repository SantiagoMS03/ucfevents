import React, { createContext, useState } from 'react'

export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    return (
        <EventsContext.Provider value={{events, setEvents, selectedEvent, setSelectedEvent}}>
            {props.children}
        </EventsContext.Provider>
    )
}