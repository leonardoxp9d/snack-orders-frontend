import { useContext, useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Head from 'next/head';
import Image from 'next/legacy/image';

import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';

import { AuthContext } from '../contexts/AuthContext';
import { canSSRGuest } from '../utils/canSSRGuest';

import logo from '../../public/logo.svg';
import background from '../../public/background.jpeg';
import  { Container } from '../../styles/home.module';
import { InputText } from '../components/ui/Input/InputText';
import { Button } from '../components/ui/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
  password: yup.string().required('Senha Obrigatória'),
});

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const methodsUseForm = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: false
  });

  const handleLogin = useCallback(async (data: SignInFormData) => {
      setLoading(true);

      await signIn({
          email: data.email,
          password: data.password,
      });

      setLoading(false);   
  },[]);

  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title>
    </Head>
    
    <Container>
      <div>     
        <img src="/logo.svg" alt="logo" /> 

       {/*
       <Image src="/logo.svg"  alt="logo" width={400} height={200} layout='responsive'/>
       <Logo src={logo} alt="logo" layout="responsive"/>
       */}


        <h1>Login</h1>

        <FormProvider {...methodsUseForm}>
          <form onSubmit={methodsUseForm.handleSubmit(handleLogin)}>
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
              Acessar
            </Button>
          </form>
        </FormProvider>

        <Link href="/signup">
          Não possui uma conta? Cadastre-se
        </Link>
      </div>

      {/*<Image src={background} alt="Imagem do Background"/> */} 

      <img src="/background.jpeg" alt="Imagem do Background" />

    </Container>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});