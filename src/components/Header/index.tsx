import { useContext,  useState, useCallback, useEffect } from 'react';
import { HeaderContainer, MenuSection, MenuToggle, MenuNav } from './styles';
import { FiShoppingCart, FiTag, FiBox, FiPower} from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/legacy/image';
import logo from '../../../public/logo.svg'
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { NodeNextRequest } from 'next/dist/server/base-http/node';

export function Header() {
    
    const { signOut } = useContext(AuthContext);
    const [isMenuToggleOn, setMenuToggleOn] = useState(false);

    const isBrowser = typeof window !== 'undefined';
    const [windowWidthSize, setWindowWidthSize] = useState(isBrowser ? window.innerWidth : 0 );

    const router = useRouter();

    const [main, setMain] = useState<HTMLElement | null>(null);
    const [clickElement, setClickElement] = useState<HTMLElement | null>(null);

    const handleOpenCloseMenuToggle = useCallback(() => {
        if(!isMenuToggleOn) {    
            main.style.filter = 'blur(3px)';
            clickElement.style.pointerEvents= 'none';
        }else {
            main.style.filter = 'none';
            clickElement.style.pointerEvents= 'auto';
        }
        setMenuToggleOn(!isMenuToggleOn); 
    }, [isMenuToggleOn, main, clickElement]);
    
    const isRouterActive = useCallback((route: string) => {
        return router.pathname === route ? 'active' : '';
    },[]);

    // Inicia as variáveis dos elementos clicáveis
    useEffect(() => {
        const mainElement = document.querySelector('.main') as HTMLElement;
        const clickElement = document.querySelector('.clickElement') as HTMLElement;

        setMain(mainElement);
        setClickElement(clickElement);
    }, []);

    // Evento ao clicar no main com o menu toggle ativado
    useEffect(() => {
        const handleClickMain = () => {
            if(isMenuToggleOn) {
                main.style.filter = 'none';
                clickElement.style.pointerEvents= 'auto';
                setMenuToggleOn(!isMenuToggleOn);
            }
        };
    
        if(main) {
            main.addEventListener('click', handleClickMain);
        
            return () => {
                main.removeEventListener('click', handleClickMain);
            };
        }
    }, [isMenuToggleOn]);

    // Monitora o tamanho atual da janela da página, e salva
    useEffect(() => {
        const handleResize = () => {
          setWindowWidthSize(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Tira efeito de filtro e elementos não clicaveis quando a tela estiver grande 
    useEffect(() => {
        if (windowWidthSize > 950 && isMenuToggleOn) {
            main.style.filter = 'none';
            clickElement.style.pointerEvents= 'auto';
            setMenuToggleOn(false);
        }         
    }, [windowWidthSize]);   

    return(
        <HeaderContainer>
            <Link href="/">
               {/*<Image src="/logo.svg" alt="logo" width={280} height={150} layout='responsive'/> */}
               <img src="/logo.svg" alt="logo"/>
            </Link>
            
            <MenuSection
                isMenuToggleOn={isMenuToggleOn}
            > 
                <MenuToggle onClick={handleOpenCloseMenuToggle}> 
                    <div></div>  
                    <div></div> 
                    <div></div> 
                </MenuToggle>
                
                <MenuNav>
                    <Link href="/dashboard" className={isRouterActive("/dashboard")}>
                        <FiShoppingCart/>
                        <span>Pedidos</span>
                    </Link>
                    
                    <Link href="/category" className={isRouterActive("/category")}>
                        <FiTag/>
                        <span>Nova Categoria</span>
                    </Link>
                    
                    <Link href="/product" className={isRouterActive("/product")} >
                        <FiBox/>
                        <span>Novo Produto</span>
                    </Link>  

                    <Link href="#" onClick={signOut}>
                        <FiPower/>
                        <span>Sair</span>
                    </Link>  
                </MenuNav>
            </MenuSection>
        </HeaderContainer>
    )
}