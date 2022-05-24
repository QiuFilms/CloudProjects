import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Menu from './Components/Menu';
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from './Components/subComponents/LoginForm';
import RegisterForm from './Components/subComponents/RegisterForm';
import AuthProvider from './Components/Context/AuthContext';
import RouteSwitch from './Components/subComponents/Router';
function App() {
  return (
    <AuthProvider>
      <RouteSwitch/>
    </AuthProvider>
  );
}

export default App;
