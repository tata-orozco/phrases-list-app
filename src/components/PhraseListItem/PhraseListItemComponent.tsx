import { XMarkIcon } from '@heroicons/react/24/solid'
import { usePhrase } from "../../hooks/usePhrase"
import type { Phrase } from "../../types"
import { PhraseListItem, PhraseTitle, DeleteButton } from "./PhraseListItemComponent.styles"

type PhraseListItemComponentProps = {
  phrase: Phrase
}

function PhraseListItemComponent({phrase}: PhraseListItemComponentProps) {

  const { dispatch } = usePhrase()

  return (
    <PhraseListItem>
        <DeleteButton
          onClick={() => dispatch({type: 'show-modal', payload: {id: phrase.id}})}
        >
          <XMarkIcon />
        </DeleteButton>
        <PhraseTitle>"{phrase.title}"</PhraseTitle>
    </PhraseListItem>
  )
}

export default PhraseListItemComponent