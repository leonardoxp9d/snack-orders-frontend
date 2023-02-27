import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Head from 'next/head';
import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import  { InputText }  from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import firstLetterUpperCase from '../../utils/firstLetterUpperCase';

interface CategoryFormData{
    category: string;
}

const schema = yup.object().shape({
    category: yup.string().trim().required('Categoria obrigatória'),
});

export default function Category() {
    const [loading, setLoading] = useState(false);
    const methodsUseForm = useForm<CategoryFormData>({
        resolver: yupResolver(schema)
    });

    const handleRegister = useCallback(async (data: CategoryFormData) => {
        try {
            setLoading(true);
            
            const categoryNameLowerCase = data.category.toLowerCase();
            const categoryNameNoSpace = categoryNameLowerCase.trim();
            const categoryNamefirstLetterUpperCase = firstLetterUpperCase(categoryNameNoSpace);

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                name: categoryNamefirstLetterUpperCase
            });

            methodsUseForm.reset();

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
        <div className={styles.container}>
            <Header/>

            <main className={styles.main}>
                <h1>Nova Categoria</h1>

                <FormProvider {...methodsUseForm}>
                    <form onSubmit={methodsUseForm.handleSubmit(handleRegister)}>
                        <InputText
                            name="category"
                            type="text"
                            placeholder="Categoria" 
                            {...methodsUseForm.register("category")}
                            error={methodsUseForm.formState.errors.category?.message}    
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
        </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
      props: {}
    }
});