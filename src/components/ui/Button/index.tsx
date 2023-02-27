import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...props }: ButtonProps) {
    return(
        <Container 
            disabled={loading}
            {...props}
        >
            { loading ? (
                <FaSpinner color="#FFF" size={16} />
            ) : (
                <a>
                    {children}
                </a>
            )}
            
        </Container>
    );
}