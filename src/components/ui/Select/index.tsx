import React, {
    SelectHTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

import { useFormContext } from 'react-hook-form';

type ItemProps = {
    id: string;
    name: string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    options: ItemProps[];
    error: string;
}

export function Select({name, icon: Icon, options, error, ...props }: SelectProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { register, watch } = useFormContext();

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!watch(name));
    }, []);

    return (
            <Container 
                isFocused={isFocused} 
                isFilled={isFilled} 
                isErrored={!!error}
                title={error}
            >
                {Icon && <Icon size={20}/>}

                <select 
                    {...register(name)}
                    onFocus={handleInputFocus}
                    {...props}
                    onBlur={handleInputBlur}
                >
                    <option selected disabled hidden value="">
                        Categoria
                    </option>
                    {options.map( (item, index) => {
                        return(
                            <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )
                    })}
                </select>   
            </Container>
    );
};