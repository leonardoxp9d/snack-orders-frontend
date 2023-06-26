import { useState, useContext, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiMail, FiLock } from 'react-icons/fi'; 

import { AuthContext } from '../../contexts/AuthContext';
import { canSSRGuest } from '../../utils/canSSRGuest';

import logo from '../../../public/logo.svg';
import background from '../../../public/background.jpeg';
import { InputText } from '../../components/ui/Input/InputText';
import { Button } from '../../components/ui/Button';
import  { Container } from '../../../styles/home.module';

interface SignUpFormData{
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
  password: yup.string().min(6, 'No mínimo 6 digitos'),
});

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const methodsUseForm = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: false
  });

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
      setLoading(true);

      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setLoading(false);
  }, []);

  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <Container>
      <div>
        {/*
        <picture>
          <source srcSet='/logo-v1.svg' width={300} media="(max-width: 400px)" /> 
          <source srcSet='/logo-v1.svg' width={400} media="(max-width: 950px)" /> 
          <img src="/logo-v1.svg" width={350} alt="Logo Sujeito Pizza" /> 
        </picture>
        */}
      
        <img src="/logo.svg" alt="logo" /> 
       
        {/*<Image src="/logo.svg" alt="logo" width={400} height={100}  layout="responsive"/> */} 


        <h1>Cadastro</h1>

        <FormProvider {...methodsUseForm}>
          <form onSubmit={methodsUseForm.handleSubmit(handleSignUp)}>
            <InputText
              name="name"
              type="text"
              icon={FiUser}
              placeholder="Nome" 
              {...methodsUseForm.register("name")}
              error={methodsUseForm.formState.errors.name?.message}    
            />

            <InputText
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail" 
              {...methodsUseForm.register("email")}
              error={methodsUseForm.formState.errors.email?.message}    
            />

            <InputText
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha" 
              {...methodsUseForm.register("password")}
              error={methodsUseForm.formState.errors.password?.message}    
            />
            
            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
        </FormProvider>

        <Link href="/">
           Já possui uma conta? Faça login! 
        </Link>
      </div>
      
      <img src="/background.jpeg" alt="Imagem do Background" />
      {/*<Image src={background}  alt="Imagem do Background" />   */}
      {/*<Image src="/garcom3.jpeg" width={1500} height={1500} alt="Imagem do Background" /> */} 

    </Container>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});