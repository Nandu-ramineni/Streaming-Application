
import { BrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import DataProvider from './context/DataProvider'


const App = () => {
  
  return (
    <DataProvider>
      <BrowserRouter>
      <HomePage/>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
