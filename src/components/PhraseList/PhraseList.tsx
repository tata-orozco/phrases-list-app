import { useMemo } from "react"
import { Virtuoso } from "react-virtuoso"
import { usePhrase } from "../../hooks/usePhrase"
import Filter from "../Filter/Filter"
import PhraseListItem from "../PhraseListItem/PhraseListItemComponent"
import { EmptyMessage, ListTitle } from "./PhraseList.styles"
import Spinner from "../Spinner/Spinner"

function PhraseListComponent() {

  const { state, isEmpty, loading } = usePhrase()

  const filteredPhrases = useMemo(() => {
    return state.phrasesList.filter(phrase => phrase.title.toLowerCase().includes(state.filter.toLowerCase()))
  }, [state.phrasesList, state.filter])

  const emptyResults = filteredPhrases.length === 0 && state.filter !== "" 

  return (
    <>
      <ListTitle>Lista de frases</ListTitle>
      {isEmpty ? (
        <EmptyMessage>Todavía no agregaste ninguna frase</EmptyMessage>
      ) : (
        <>
          <Filter />
          {loading ? (
            <Spinner />
          ) : emptyResults ? (
            <EmptyMessage>No hay resultados</EmptyMessage>
          ) : (
            <Virtuoso
              style={{ height: '400px' }}
              totalCount={filteredPhrases.length}
              itemContent={(index) => (
                <PhraseListItem
                  key={filteredPhrases[index].id}
                  phrase={filteredPhrases[index]}
                />
              )}
            />
          )}
        </>
      )}
    </>
  )
}

export default PhraseListComponent