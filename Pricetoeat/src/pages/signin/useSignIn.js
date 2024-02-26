export function useSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nomeCadastro, setNomeCadastro] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [escondeSenha, setEscondeSenha] = useState(true);
    const [SenhaVisible, setSenhaVisible] = useState(false);
    const handleOpenModalSenha = () => {setSenhaVisible(true);}
    const auth = getAuth(app)
    const [loginSelected, setLoginSelected] = useState(true);
    const [cadastroSelected, setCadastroSelected] = useState(false);
    const handleLoginSelect = () => {
      setLoginSelected(true);
      setCadastroSelected(false);
    };
    const handleCadastroSelect = () => {
      setLoginSelected(false);
      setCadastroSelected(true);
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            navigation.navigate('home')
            const user = userCredential.user;
            console.log('sucesso')
        }).catch(error => {
            console.log(error)
        })}

    return {
        email,setEmail,password,setPassword,
        emailCadastro,setEmailCadastro,senhaCadastro,
        setSenhaCadastro,nomeCadastro,setNomeCadastro,
        escondeSenha,setEscondeSenha,SenhaVisible,setSenhaVisible,
        handleOpenModalSenha,loginSelected,setLoginSelected,
        cadastroSelected,setCadastroSelected,handleLoginSelect,
        handleCadastroSelect,handleSignIn

    }

}