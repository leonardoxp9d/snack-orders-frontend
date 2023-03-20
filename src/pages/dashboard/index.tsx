import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Modal from 'react-modal';
import { FiRefreshCcw } from 'react-icons/fi';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { ModalOrder } from '../../components/ModalOrder';


type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;  
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps){
  const [orderList, setOrderList] = useState(orders || []);

  const[modalItem, setModalItem] = useState<OrderItemProps[]>();
  const[modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleOpenModal = useCallback(async (id: string) => {
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      }
    });

    setModalItem(response.data);

    setModalVisible(true);
  }, []);

  const handleFinishItem = useCallback(async (id: string) => {
    const apiClient = setupAPIClient();

    await apiClient.put('/order/finish', {
      order_id: id,
    });

    const response = await apiClient.get('/orders');

    setOrderList(response.data);
    setModalVisible(false);
  }, []);

  const handleRefreshOrders = useCallback(async() => {
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/orders');
    
    setOrderList(response.data);
  }, [orderList]);

  useEffect(() => {
    const interval = setTimeout(() => {
      handleRefreshOrders();
    }, 1000);
    
    return () => clearTimeout(interval);
  }, [handleRefreshOrders]);

  //Modal.setAppElement('#__next');

  return(
    <>
    <Head>
      <title>Painel - Sujeito Pizzaria</title>
    </Head>

    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Últimos Pedidos</h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw size={25} color="#FF9000"/>
          </button>
        </div>

        <article className={styles.listOreders}>
          {orderList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

          {orderList.map( item => (
            <section key={item.id} className={styles.orderItem} >
              <button onClick={ () => handleOpenModal(item.id) }>
                <div></div>
                <span>Mesa {item.table}</span>
              </button>
            </section>
          ))}     
        </article>
      </main>

      { modalVisible && (
        <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={handleFinishItem}
        />
      )}
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data
    }
  }
});