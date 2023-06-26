import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useFormContext } from 'react-hook-form';
import { Container } from './styles';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    placeholder?: string;
    error: string;
}
    
export function InputText({ name, icon: Icon, error, ...props}: InputProps ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { register, watch } = useFormContext();
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!watch(name).trim());
    }, []);

    return (
        <>        
        <Container 
            isFocused={isFocused} 
            isFilled={isFilled} 
            isErrored={!!error}
            title={error}
        >
            {Icon && <Icon/>} 
            <input
                {...register(name)}
                onFocus={handleInputFocus}
                {...props}
                onBlur={handleInputBlur}
            />
        </Container>
        </>
    );
};
