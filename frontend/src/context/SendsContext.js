import { createContext, useReducer } from "react";

export const SendsContext = createContext()

export const sendsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SENDS':
            return {
                sends: action.payload
            }
        case 'CREATE_SEND':
            return {
                sends: [action.payload, ...state.sends]
            }
        default:
            return state
    }
}

export const SendsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sendsReducer, {
        sends: null
    })

    return (
        <SendsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </SendsContext.Provider>
    )
}