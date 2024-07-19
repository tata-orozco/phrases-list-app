import { createContext, ReactNode, useReducer, useMemo, useState } from "react";
import { initialState, PhraseActions, phraseReducer, PhraseState } from "../reducers/phrase-reducer";

type PhraseContextProps = {
    state: PhraseState;
    dispatch: React.Dispatch<PhraseActions>;
    isEmpty: boolean;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type PhraseProviderProps = {
    children: ReactNode
}

export const PhraseContext = createContext<PhraseContextProps>({} as PhraseContextProps)

export const PhraseProvider = ({children}: PhraseProviderProps) => {

    const [state, dispatch] = useReducer(phraseReducer, initialState)
    const [loading, setLoading] = useState(false)

    const isEmpty = useMemo(() => state.phrasesList.length === 0, [state.phrasesList])
    
    return (
        <PhraseContext.Provider
            value={{
                state,
                dispatch,
                isEmpty,
                loading,
                setLoading
            }}
        >
            {children}
        </PhraseContext.Provider>
    )
}