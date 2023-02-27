import {
    ComponentType,
    TextareaHTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    icon?: ComponentType<IconBaseProps>;
    error: any;
}

export function Textarea({name, icon: Icon, error, ...props}: TextAreaProps) {

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

        <Container 
            isFocused={isFocused} 
            isFilled={isFilled} 
            isErrored={!!error}
            title={error}
        >
            
            {Icon && <Icon size={20} />}
            
            <textarea
                {...register(name)}
                onFocus={handleInputFocus}
                {...props}
                onBlur={handleInputBlur}
            />     
        </Container>
    );
};