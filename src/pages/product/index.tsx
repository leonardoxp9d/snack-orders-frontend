import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';

import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiImage, FiTag, FiBox, FiEdit } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

import { Container, Main, Title } from  './styles';
import { Header } from '../../components/Header';
import { InputText } from '../../components/ui/Input/InputText';
import { InputCurrency } from '../../components/ui/Input/InputCurrency';
import { InputImage } from '../../components/ui/Input/InputImage';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import firstLetterUpperCase from '../../utils/firstLetterUpperCase';


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
    .test('required', "Imagem obrigatória", (value) =>{
        return value && value.length
    }),
    category: yup.string().required('Categoria obrigatória'),
    name: yup.string().trim().required('Nome obrigatório'),
    price: yup.string().required('Preço obrigatório'),  
    description: yup.string().trim().required('Descrição obrigatória'),
});

export default function Product({ categoryList }: CategoryProps) {
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(false);

    const methodsForm = useForm<ProductFormData>({
        resolver: yupResolver(schema),
        shouldFocusError: false     
    });

    const handleRegister = useCallback(async (product: ProductFormData) => {
        try {
            setLoading(true);

            const productNameLowerCase = product.name.toLowerCase();
            const productNameNoSpace = productNameLowerCase.trim();
            const productNamefirstLetterUpperCase = firstLetterUpperCase(productNameNoSpace);
            
            const formData = new FormData();     
    
            formData.append('file', product.image[0]);
            formData.append('category_id', categoryList[product.category].id);
            formData.append('name', productNamefirstLetterUpperCase);
            formData.append('price', product.price);
            formData.append('description', product.description);

            await apiClient.post('/product', formData);

            methodsForm.reset({
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
            <Main className='main'>
                <Title>
                    <FiBox/>
                    <h1>Novo Produto</h1>
                </Title>

                <FormProvider {...methodsForm}>
                    <form onSubmit={methodsForm.handleSubmit(handleRegister)} className="clickElement">
                        <InputImage
                            name="image"
                            type="file"
                            icon={FiImage}
                            error={methodsForm.formState.errors.image?.message} 
                        />       

                        <Select
                            name="category"
                            icon={FiTag}
                            options={categoryList}
                            error={methodsForm.formState.errors.category?.message}    
                        />
                    
                        <InputText
                            name="name"
                            type="text"
                            icon={FiBox}
                            placeholder="Produto"
                            error={methodsForm.formState.errors.name?.message}    
                        />

                        <InputCurrency
                            name="price"
                            type="text"
                            icon={BsCurrencyDollar}
                            placeholder="Preço"
                            error={methodsForm.formState.errors.price?.message}    
                        />

                        <Textarea
                            name="description"
                            icon={FiEdit}
                            placeholder="Descrição..."
                            error={methodsForm.formState.errors.description?.message}    
                        />  

                        <Button 
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>         
                    </form>
                </FormProvider>
            </Main>
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