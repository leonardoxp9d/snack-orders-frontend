import Modal from 'react-modal';
import { Container, ButtonClose, ButtonFinish, ListItem } from './styles';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder  }: ModalOrderProps){

  const modalStyle = {
    content:{
      top: '50%',
      right: 'auto',
      bottom: 'auto',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      //margin: '5px',
      maxWidth:'60rem',
      width: '90%',
      padding: '3.5rem',
      backgroundColor: 'var(--background)',
      borderRadius: '1rem',
    }
  };

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
    >

        <Container>
          <ButtonClose
            type="button"
            onClick={onRequestClose}
          >
            <FiX/>
          </ButtonClose>

          <h2>Detalhes do pedido</h2>

          <span>
              Mesa: {order[0].order.table}
          </span>

          {order.map( item => (
              <ListItem key={item.id} >
                <span>{item.amount} - {item.product.name}</span>
                <span>{item.product.description}</span>
              </ListItem>
          ))}     

          <ButtonFinish 
            onClick={ () => handleFinishOrder(order[0].order_id) }
          >
            Finalizar pedido
          </ButtonFinish>
        </Container>
    </Modal>
  )
}