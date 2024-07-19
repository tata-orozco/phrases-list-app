import { render, screen, fireEvent } from '@testing-library/react'
import { jest } from '@jest/globals'
import { usePhrase } from '../../../hooks/usePhrase'
import { showToastError, showToastInfo } from '../../../utils/toastUtils'
import Modal from '../Modal'

jest.mock('../../../hooks/usePhrase', () => ({
    usePhrase: jest.fn()
}));

jest.mock('../../../utils/toastUtils', () => ({
    showToastError: jest.fn(),
    showToastInfo: jest.fn()
}))

describe('Modal Component', () => {
    const mockDispatch = jest.fn()

    beforeEach(() => {
        (usePhrase as jest.Mock).mockReturnValue({
            state: {
            activeId: '1',
            },
            dispatch: mockDispatch
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the modal with the provided text', () => {
        render(<Modal text="Are you sure?" />)
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('Aceptar')).toBeInTheDocument()
        expect(screen.getByText('Cancelar')).toBeInTheDocument()
    })

    it('should close the modal when clicking outside the inner wrapper', () => {
        render(<Modal text="Are you sure?" />)
        fireEvent.click(screen.getByTestId('modal-wrapper'))
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'close-modal' })
    })

    it('should close the modal when clicking the close button', () => {
        render(<Modal text="Are you sure?" />)
        fireEvent.click(screen.getByTestId('close-button'))
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'close-modal' })
    })

    it('should dispatch delete-phrase and show error toast if activeId is present', () => {
        render(<Modal text="Are you sure?" />)
        fireEvent.click(screen.getByText('Aceptar'))
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'delete-phrase', payload: { id: '1' } })
        expect(showToastError).toHaveBeenCalledWith('Frase eliminada')
    })

    it('should dispatch reset-app and show info toast if activeId is not present', () => {
        (usePhrase as jest.Mock).mockReturnValue({
            state: {
            activeId: null,
            },
            dispatch: mockDispatch
        })

        render(<Modal text="Are you sure?" />)
        fireEvent.click(screen.getByText('Aceptar'))
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset-app' })
        expect(showToastInfo).toHaveBeenCalledWith('App reiniciada')
    })

    it('should close the modal when clicking the Cancelar button', () => {
        render(<Modal text="Are you sure?" />)
        fireEvent.click(screen.getByText('Cancelar'))
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'close-modal' })
    })
})