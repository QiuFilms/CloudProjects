import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Menu from './Components/Menu';
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from './Components/subComponents/LoginForm';
import RegisterForm from './Components/subComponents/RegisterForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu/>} />
      <Route path="home" element={<Main />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;
