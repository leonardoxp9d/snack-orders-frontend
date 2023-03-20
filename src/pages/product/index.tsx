import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';

import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiImage, FiTag, FiPackage, FiEdit } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

import { Container } from  './styles';
import { Header } from '../../components/Header';
import { InputText, InputCurrency, InputImage } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

type ProductFormData = {
    image: string | Blob;
    category: string;
    name: string;
    price: string;
    description: string;
}

const schema = yup.object().shape({
    image: yup.mixed()
    .test('required', "Selecione uma imagem", (value) =>{
        return value && value.length
    }),
    category: yup.string().required('Selecione uma categoria'),
    name: yup.string().trim().required('Nome obrigatório'),
    price: yup.string().required('Preço obrigatório'),  
    description: yup.string().trim().required('Descrição obrigatória'),
});

export default function Product({ categoryList }: CategoryProps) {
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(false);

    const methods = useForm<ProductFormData>({
        resolver: yupResolver(schema),
        shouldFocusError: false     
    });


    const handleRegister = useCallback(async (data: ProductFormData) => {
        try {
            setLoading(true);
            
            const formData = new FormData();     
    
            formData.append('file', data.image[0]);
            formData.append('category_id', categoryList[data.category].id);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);

            await apiClient.post('/product', formData);

            methods.reset({
                image: '',
                category: '',
                name: '',
                price: '',
                description: ''
            });

            setLoading(false);

            toast.success('Produto cadastrado com sucesso', { theme: "dark" });
        } catch (err) {
            setLoading(false);

            const errorMenssage = err.response?.data.error;
            
            if(errorMenssage){
                toast.error(errorMenssage, { theme: "dark" });
                return;
            }

            console.log("Erro ao cadastrar produto ", err);
        }          
    }, [apiClient]);

    return(
        <>
        <Head>
            <title>Novo Produto - Sujeito Pizzaria</title>
        </Head>

        <Container>
            <Header/>
            <main>
                <h1>Novo Produto</h1>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleRegister)}>
                        <InputImage
                            name="image"
                            type="file"
                            icon={FiImage}
                            error={methods.formState.errors.image?.message} 
                        />       

                        <Select
                            name="category"
                            icon={FiTag}
                            options={categoryList}
                            error={methods.formState.errors.category?.message}    
                        />
                    
                        <InputText
                            name="name"
                            type="text"
                            icon={FiPackage}
                            placeholder="Produto"
                            error={methods.formState.errors.name?.message}    
                        />

                        <InputCurrency
                            name="price"
                            type="text"
                            icon={BsCurrencyDollar}
                            placeholder="Preço"
                            error={methods.formState.errors.price?.message}    
                        />

                        <Textarea
                            name="description"
                            icon={FiEdit}
                            placeholder="Descrição..."
                            error={methods.formState.errors.description?.message}    
                        />  

                        <Button 
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>         
                    </form>
                </FormProvider>
            </main>
        </Container>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    return {
      props: {
        categoryList: response.data
      }
    }
});