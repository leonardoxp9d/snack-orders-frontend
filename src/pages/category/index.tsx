import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { FiTag } from 'react-icons/fi';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

import { Container, Title, Main } from './styles';
import { Header } from '../../components/Header';
import  { InputText }  from '../../components/ui/Input/InputText';
import { Button } from '../../components/ui/Button';
import firstLetterUpperCase from '../../utils/firstLetterUpperCase';

interface CategoryFormData{
    name: string;
}

const schema = yup.object().shape({
    name: yup.string().trim().required('Categoria obrigatória'),
});

export default function Category() {
    const [loading, setLoading] = useState(false);
    const  methodsForm = useForm<CategoryFormData>({
        resolver: yupResolver(schema),
        shouldFocusError: false
    });

    const handleRegister = useCallback(async (category: CategoryFormData) => {
        try {
            setLoading(true);
            
            const categoryNameLowerCase = category.name.toLowerCase();
            const categoryNameNoSpace = categoryNameLowerCase.trim();
            const categoryNamefirstLetterUpperCase = firstLetterUpperCase(categoryNameNoSpace);

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                name: categoryNamefirstLetterUpperCase
            });

             methodsForm.reset();

            setLoading(false);

            toast.success('Categoria cadastrada com sucesso', { theme: "dark" });
        } catch (err) {
            setLoading(false);

            const errorMenssage = err.response?.data.error;

            if(errorMenssage){
                toast.error(errorMenssage, { theme: "dark" });
                return;
            }

            console.log("Erro ao cadastrar categoria", err);
        }     
    }, []);   

    return(
        <>
        <Head>
            <title>Nova Categoria - Sujeito Pizzaria</title>
        </Head>
        <Container>
            <Header/>
            <Main className='main'>
                <Title>
                    <FiTag/>
                    <h1>Nova Categoria</h1>
                </Title>
                <FormProvider {... methodsForm}>
                    <form onSubmit={ methodsForm.handleSubmit(handleRegister)} className="clickElement">
                        <InputText
                            name="name"
                            type="text"
                            icon={FiTag}
                            placeholder="Categoria" 
                            {... methodsForm.register("name")}
                            error={ methodsForm.formState.errors.name?.message}    
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
    return {
      props: {}
    }
});