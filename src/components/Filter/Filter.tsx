import { useEffect, useState } from "react"
import { usePhrase } from "../../hooks/usePhrase"
import { FilterInput } from "./Filter.styles"
import { useDebounce } from "../../hooks/useDebounce"

function Filter() {

  const { dispatch, setLoading } = usePhrase()
  const [inputValue, setInputValue] = useState('')

  const debouncedValue = useDebounce(inputValue, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setLoading(true)
  }

  useEffect(() => {
    dispatch({type: 'set-filter', payload: {filter: debouncedValue}})
    setLoading(false)
  }, [debouncedValue, dispatch])
  
  return (
    <form>
        <FilterInput
          type="text"
          placeholder="Filtrar frase"
          value={inputValue}
          onChange={handleChange}
        />
    </form>
  )
}

export default Filter