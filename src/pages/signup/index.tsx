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

import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo.svg';
import { InputText } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button'
import background from '../../../public/garcom3.jpeg';

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
    resolver: yupResolver(schema)
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
    <div className={styles.container}>
      <div className={styles.login}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
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

        <Link legacyBehavior href="/">
           <a className={styles.text}>Já possui uma conta? Faça login!</a> 
        </Link>
      </div>
      <Image src={background} className={styles.background}  alt="Imagem do Background" />   
    </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});