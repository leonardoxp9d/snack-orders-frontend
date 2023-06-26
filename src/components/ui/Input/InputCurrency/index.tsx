import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

import { useFormContext, Controller } from 'react-hook-form';
import { NumericFormat } from "react-number-format";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    placeholder?: string;
    error: string;
}


export function InputCurrency({ name, icon: Icon, placeholder, error }: InputProps ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { watch, control } = useFormContext();
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!watch(name));
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
            <Controller
                name={name}
                control={control}
                defaultValue="" 
                render={({ field: { onChange, value } }) => (
                <NumericFormat 
                    placeholder={placeholder}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"R$ "}
                    value={value}
                    onValueChange={(v) => {
                        onChange(v.formattedValue);                    
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />                
                )}
            />
        </Container>
        </>
    );
};