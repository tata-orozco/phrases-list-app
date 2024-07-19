import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { jest } from '@jest/globals'
import Filter from '../Filter'

const mockDispatch = jest.fn()
const mockSetLoading = jest.fn()

jest.mock('../../../hooks/usePhrase', () => ({
    usePhrase: () => ({
        dispatch: mockDispatch,
        setLoading: mockSetLoading
    })
}))

jest.mock('../../../hooks/useDebounce', () => ({
    useDebounce: (value: any, delay: number) => value
}))

describe('Filter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
  
    it('should render correctly', () => {
        render(<Filter />)
        expect(screen.getByPlaceholderText('Filtrar frase')).toBeInTheDocument()
    });
  
    it('should call setLoading on input change', () => {
        render(<Filter />)
        fireEvent.change(screen.getByPlaceholderText('Filtrar frase'), { target: { value: 'test' } })
        expect(mockSetLoading).toHaveBeenCalledWith(true)
    })
  
    it('should dispatch the filter value after debounce', async () => {
        render(<Filter />)
        fireEvent.change(screen.getByPlaceholderText('Filtrar frase'), { target: { value: 'test' } })

        await waitFor(() => {
            expect(mockSetLoading).toHaveBeenCalledWith(false)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'set-filter',
                payload: { filter: 'test' }
            })
        })
    })
})