import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, Textwhite, Linkgreen, Row, Wrapper, TermoText, TextContainer } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        defaultValues: {
            NomeCompleto: '',
            email: '',  
            senha: '',  
          },
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}`);
            
            if(!data.length){
                
                alert('Usuário criado com sucesso!');
                navigate('/login');
                return
            }

            alert('Usuário já existente')
        }catch(e){
            console.error('Erro na requisição:', e);
            alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="NomeCompleto"  control={control} />
                    {errors.NomeCompleto && <span>Nome completo é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <TermoText> 
                        Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO. 

                    </TermoText>
                </Row>
                <Row>
                    <TextContainer>
                        <Textwhite>Já tenho conta. </Textwhite>
                        <Linkgreen onClick={() => navigate('/login')}>Fazer login</Linkgreen>
                    </TextContainer>
                </Row>
                
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }