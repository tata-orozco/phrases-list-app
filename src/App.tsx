import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"
import { usePhrase } from "./hooks/usePhrase"
import { MainWrapper, UpperWrapper, Section } from "./App.styles"
import { Button } from "./GlobalStyles"
import Modal from "./components/Modal/Modal"
import HeaderComponent from "./components/Header/HeaderComponent"
import Form from "./components/Form/Form"
import PhraseList from "./components/PhraseList/PhraseList"

function App() {

  const { state, dispatch, isEmpty } = usePhrase()

  useEffect(() => {
    if(state.phrasesList.length) {
      localStorage.setItem('phrases-list', JSON.stringify(state.phrasesList))
    }
  }, [state.phrasesList])

  return (
    <>
      {state.modal ? (
        state.activeId ? (
          <Modal text="¿Estás seguro/a que deseas eliminar esta frase?" />
        ) : (
          <Modal text="¿Estás seguro/a que deseas reiniciar la App?" />
        )
      ) : null}
      <HeaderComponent />
      <MainWrapper>
        {/* Agregar boton para agregar al input una frase aleatoria de una API */}
        <UpperWrapper>
          <Button
            disabled={isEmpty}
            onClick={() => dispatch({type: 'show-modal'})}
          >
            Reiniciar App
          </Button>
        </UpperWrapper>
        <Section>
          <Form />
        </Section>
        <Section>
          <PhraseList />
        </Section>
        <ToastContainer />
      </MainWrapper>
    </>
  )
}

export default App