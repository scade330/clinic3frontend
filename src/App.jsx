import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import '../src/index.css';


function App() {
 
  return (
    <>
<Header/>
<Outlet />
    </>
  )
}

export default App
