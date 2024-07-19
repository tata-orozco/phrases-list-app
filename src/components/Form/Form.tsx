import { showToastSuccess } from "../../utils/toastUtils"
import { useState } from "react"
import { usePhrase } from "../../hooks/usePhrase"
import { FormWrapper, TextArea, SubmitButton } from "./Form.styles"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import type { DraftPhrase } from "../../types"

const MAX_LENGTH = 150;
const MIN_LENGTH = 10;

function Form() {

  const { dispatch } = usePhrase()

  const [phrase, setPhrase] = useState<DraftPhrase>({
    title: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    return setPhrase({
      ...phrase,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(phrase.title === '') {
      setError('Ingresá una frase')
      return
    }
    if(phrase.title.length > MAX_LENGTH) {
      setError(`Ingresá un máximo de ${MAX_LENGTH} caracteres`)
      return
    }
    if(phrase.title.length < MIN_LENGTH) {
      setError(`Ingresá un mínimo de ${MIN_LENGTH} caracteres`)
      return
    }  

    setError('')

    dispatch({type: 'add-phrase', payload: {phrase}})

    showToastSuccess('Frase agregada!')

    setPhrase({title: ''})
  }

  return (
    <FormWrapper
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="title"
      >
        Escribí tu frase acá:
      </label>
      <TextArea
        id="title"
        placeholder='La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...'
        value={phrase.title}
        onChange={handleChange}
      />
      <SubmitButton
        type="submit"
        value="Agregar frase"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormWrapper>
  )
}

export default Form