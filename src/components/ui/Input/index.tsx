import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiUpload } from 'react-icons/fi';

import { Container, ContainerImage } from './styles';

import { useFormContext, Controller } from 'react-hook-form';
import { NumericFormat } from "react-number-format";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    placeholder?: string;
    error: string;
}
    
// ------------ InputText ------------ 
export function InputText({ name, icon: Icon, error, ...props}: InputProps ) {
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
        <>        
        <Container 
            isFocused={isFocused} 
            isFilled={isFilled} 
            isErrored={!!error}
            title={error}
        >
            {Icon && <Icon size={20} />} 
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

// ------------ InputCurrency ------------ 
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
            {Icon && <Icon size={20} />} 

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                <NumericFormat 
                    placeholder={placeholder}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"R$ "}
                    onValueChange={(v) => {
                    onChange(v.value);                    
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

// ------------ InputImage ------------ 
export function InputImage({name, error, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { register, watch } = useFormContext();
    const image  = watch(name);
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!watch(name).length);
    }, []);

    useEffect(() => {
        if (image && image[0]) {
          const newImageUrl = URL.createObjectURL(image[0]);
    
          if (newImageUrl !== imageUrl) {
            setImageUrl(newImageUrl);
          }
        }else {
            setImageUrl('')
        }
      }, [image]);    

    return (
        <ContainerImage 
            isFocused={isFocused} 
            isFilled={isFilled} 
            isErrored={!!error}
            title={error}
        >

            <label>
                <div>
                    <FiUpload size={40}/>
                </div>

                <input                 
                    {...register(name)}
                    onFocus={handleInputFocus}  
                    {...props}
                    onBlur={handleInputBlur}
                />

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Foto do produto"
                        width={250}
                        height={250} 
                    />
                )}
            </label>            
        </ContainerImage>
    );
};
