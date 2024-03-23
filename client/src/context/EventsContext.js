import React, { createContext, useState } from 'react'

export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    return (
        <EventsContext.Provider value={{events, setEvents}}>
            {props.children}
        </EventsContext.Provider>
    )
}