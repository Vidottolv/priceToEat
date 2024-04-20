import { showMessage } from 'react-native-flash-message';

export function Messages() {
    const MSG_SucessoCadastro = () => {
        showMessage({
            backgroundColor: '#0bbd29',
            message: 'Sucesso no cadastro!',
            type: 'info',
        });
    }
    const MSG_ErroCadastro = () => {
        showMessage({
            backgroundColor: '#E06F72',
            message: 'Erro no Cadastro! Preencha todos os campos.',
            type: 'info',
        });
    }
    const MSG_SucessoLogin = () => {
        showMessage({
            backgroundColor: '#E06F72',
            message: 'Autenticado! Indo para a o app.',
            type: 'info',
        });
    }
  
    return { MSG_SucessoCadastro, MSG_ErroCadastro, MSG_SucessoLogin };

}
