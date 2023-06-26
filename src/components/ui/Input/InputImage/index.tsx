import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

import { useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    placeholder?: string;
    error: string;
}

export function InputImage({name, icon: Icon, error, ...props }: InputProps) {
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
            setImageUrl('');
        }
    }, [image]);    

    return (
        <Container
            isFocused={isFocused} 
            isFilled={isFilled} 
            isErrored={!!error}
            title={error}
        >
            <label>
                <div>
                    {Icon && <Icon/>}
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
                        alt="Imagem do produto"
                        width={10}
                        height={10} 
                    />
                )}
            </label>            
        </Container>
    );
};