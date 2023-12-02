import { SendsContext } from "../context/SendsContext";
import { useContext } from "react";

export const useSendsContext = () => {
    const context = useContext(SendsContext)

    if (!context) {
        throw Error('useSendsContext must be used inside a SendsContextProvider')
    }

    return context
}