import { GlobalProvider } from './src/components/context/produtoContext'
import Routes from './src/routes'

export default function App(){
  return(
    <GlobalProvider>
      <Routes/>
    </GlobalProvider>
  )
}

