import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiShoppingCart, FiTag, FiPackage, FiPower} from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    
    const { signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link legacyBehavior href="/dashboard">
                    <img src="/logo.svg" width={250} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link legacyBehavior href="/">
                        <a>
                            <FiShoppingCart className='svg'  />
                            Pedidos
                        </a>
                    </Link>
                    
                    <Link legacyBehavior href="/category">
                        <a>
                            <FiTag className='svg'  />
                            Nova Categoria

                        </a>
                    </Link>
                    
                    <Link legacyBehavior href="/product" >
                        <a>
                            <FiPackage className='svg' />
                            Novo Produto
                        </a>
                    </Link>    
          
                    <button onClick={signOut}>
                        <FiPower/>
                        Sair
                    </button>
                </nav>

            </div>            
        </header>
    )
}