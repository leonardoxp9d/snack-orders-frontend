import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder  }: ModalOrderProps){

  const customStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#312E38',
      borderRadius: '10px', 
    }
  };

  return(

    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
    >
          <button
              type="button"
              onClick={onRequestClose}
              className={styles.buttonClose} 
          >
              <FiX size={30} color="#ff9000" />
          </button>
        

        <div className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>
              Mesa: <strong>{order[0].order.table}</strong>
          </span>

          {order.map( item => (
              <section key={item.id} className={styles.item}>
                <span>{item.amount} - <strong>{item.product.name}</strong></span>
                <span className={styles.description}>{item.product.description}</span>
              </section>
          ))}     

          
          <button 
            className={styles.buttonFinish} 
            onClick={ () => handleFinishOrder(order[0].order_id) }
          >
            Finalizar pedido
          </button>
        </div>
    </Modal>
  )
}