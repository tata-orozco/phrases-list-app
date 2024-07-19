import { v4 as uuidv4 } from 'uuid';
import type { DraftPhrase, Phrase } from "../types"

export type PhraseActions =
    { type: 'add-phrase', payload: { phrase: DraftPhrase } } |
    { type: 'delete-phrase', payload: { id: Phrase['id'] } } |
    { type: 'set-filter', payload: { filter: string} } |
    { type: 'show-modal', payload?: { id: Phrase['id'] } } |
    { type: 'close-modal' } |
    { type: 'reset-app'}

export type PhraseState = {
    phrasesList: Phrase[],
    modal: boolean,
    activeId: string,
    filter: string
}

const phraseInitialState = () => {
    const phrasesListLs = localStorage.getItem('phrases-list')
    return phrasesListLs ? JSON.parse(phrasesListLs) : []
}

export const initialState: PhraseState = {
    phrasesList: phraseInitialState(),
    modal: false,
    activeId: '',
    filter: ''
}

const createPhrase = (draftPhrase: DraftPhrase) => {
    return {
        ...draftPhrase,
        id: uuidv4()
    }
}

export const phraseReducer = (
    state: PhraseState = initialState,
    action: PhraseActions
) => {
    if(action.type === 'add-phrase') {
        const newPhrase = createPhrase(action.payload.phrase)
        return {
            ...state,
            phrasesList: [...state.phrasesList, newPhrase]
        }
    }
    if(action.type === 'delete-phrase') {
        return {
            ...state,
            phrasesList: state.phrasesList.filter(phrase => phrase.id !== action.payload.id),
            activeId: '',
            modal: false
        }
    }
    if(action.type === 'show-modal') {
        return {
            ...state,
            activeId: action.payload?.id || '',
            modal: true
        }
    }
    if(action.type === 'close-modal') {
        return {
            ...state,
            activeId: '',
            modal: false
        }
    }
    if(action.type === 'reset-app') {
        localStorage.removeItem('phrases-list')
        return {
            ...state,
            phrasesList: [],
            modal: false,
            filter: ''
        }
    }
    if(action.type === 'set-filter') {
        return {
            ...state,
            filter: action.payload.filter
        }
    }

    return state
}