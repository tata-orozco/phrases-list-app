import { render, screen, fireEvent } from '@testing-library/react'
import { jest } from '@jest/globals'
import Form from '../Form'
import { usePhrase } from '../../../hooks/usePhrase'
import { showToastSuccess } from '../../../utils/toastUtils'

jest.mock('../../../hooks/usePhrase', () => ({
    usePhrase: jest.fn()
}))

jest.mock('../../../utils/toastUtils', () => ({
    showToastSuccess: jest.fn()
}))

describe('Form Component', () => {
    const mockDispatch = jest.fn()

    beforeEach(() => {
        (usePhrase as jest.Mock).mockReturnValue({
            dispatch: mockDispatch
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the form elements correctly', () => {
        render(<Form />)
        expect(screen.getByLabelText('Escribí tu frase acá:')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Agregar frase')).toBeInTheDocument()
    })

    it('should update the phrase state on textarea change', () => {
        render(<Form />)
        const textarea = screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')
        fireEvent.change(textarea, { target: { value: 'Nueva frase' } })
        expect(textarea).toHaveValue('Nueva frase')
    })

    it('should display an error message if the title is empty on submit', () => {
        render(<Form />)
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))
        expect(screen.getByText('Ingresá una frase')).toBeInTheDocument()
    })

    it('should display an error message if the title exceeds the maximum length', () => {
        render(<Form />)
        const textarea = screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')
        fireEvent.change(textarea, { target: { value: 'a'.repeat(151) } })
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))
        expect(screen.getByText('Ingresá un máximo de 150 caracteres')).toBeInTheDocument()
    })

    it('should show an error message if the title does not exceed the minimum length', () => {
        render(<Form />)
        const textarea = screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')
        fireEvent.change(textarea, { target: { value: 'a'.repeat(2) } })
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))
        expect(screen.getByText('Ingresá un mínimo de 10 caracteres')).toBeInTheDocument()
    })

    it('should dispatch the add-phrase action and show a success toast on valid submit', () => {
        render(<Form />)
        const textarea = screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')
        fireEvent.change(textarea, { target: { value: 'Frase válida' } })
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'add-phrase', payload: { phrase: { title: 'Frase válida' } } })
        expect(showToastSuccess).toHaveBeenCalledWith('Frase agregada!')
        expect(textarea).toHaveValue('')
    })

    it('should clear the error message on valid submit', () => {
        render(<Form />)
        const textarea = screen.getByPlaceholderText('La energía y la persistencia conquistan todas las cosas —Benjamin Franklin...')
        fireEvent.change(textarea, { target: { value: '' } })
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))
        expect(screen.getByText('Ingresá una frase')).toBeInTheDocument()

        fireEvent.change(textarea, { target: { value: 'Frase válida' } })
        fireEvent.click(screen.getByDisplayValue('Agregar frase'))

        expect(screen.queryByText('Ingresá una frase')).not.toBeInTheDocument()
        expect(screen.queryByText('Ingresá un máximo de 150 caracteres')).not.toBeInTheDocument()
    })
})