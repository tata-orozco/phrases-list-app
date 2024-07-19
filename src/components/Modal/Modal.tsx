import { showToastError, showToastInfo } from "../../utils/toastUtils"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { usePhrase } from '../../hooks/usePhrase'
import { ModalWrapper, ModalInnerWrapper, CloseButton, Message, ButtonWrapper } from './Modal.styles'
import { Button } from '../../GlobalStyles'

type ModalProps = {
    text: string
}

export default function Modal({text} : ModalProps) {

  const { state, dispatch } = usePhrase()

  return (
    <ModalWrapper
      data-testid="modal-wrapper"
      onClick={() => dispatch({type: 'close-modal'})}
    >
      <ModalInnerWrapper 
        onClick={e => e.stopPropagation()}
      >
        <CloseButton
          data-testid="close-button"
          onClick={() => dispatch({type: 'close-modal'})}
        >
          <XMarkIcon />
        </CloseButton>
        <Message>{text}</Message>
        <ButtonWrapper>
            <Button
                type='button'
                onClick={() => {
                    if (state.activeId) {
                      dispatch({type: 'delete-phrase', payload: {id: state.activeId}})
                      showToastError('Frase eliminada');
                    } else {
                      dispatch({type: 'reset-app'})
                      showToastInfo('App reiniciada');
                    }
                }}
            >Aceptar</Button>
            <Button
                type='button'
                onClick={() => dispatch({type: 'close-modal'})}
            >Cancelar</Button>
        </ButtonWrapper>
      </ModalInnerWrapper>
    </ModalWrapper>
  )
}