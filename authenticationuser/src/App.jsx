
import './App.css'
import CreateTeacher from './components/CreateTeacher';
import List from './components/List '
import LoginCom from './components/LoginCom'
import Registration from './components/Registration'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginCom />} />
          <Route path="/list" element={<List />} />
          <Route path="/" element={<Registration />} />
          <Route path='/create' element={<CreateTeacher />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App

