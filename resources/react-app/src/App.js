import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Rotate from './routing/Rotate'
import { BrowserRouter } from 'react-router-dom'
import TopToScroll from './components/toptoscroll/TopToScroll'

function App() {
  return (
    <BrowserRouter>
      <Rotate />
    </BrowserRouter>
  )
}

export default App
