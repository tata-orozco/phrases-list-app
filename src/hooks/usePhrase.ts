import { useContext } from "react"
import { PhraseContext } from "../context/PhraseContext"

export const usePhrase = () => {
    const context = useContext(PhraseContext)
    if(!context) {
        throw new Error('usePhrase must be used within a PhraseProvider')
    }
    return context
}