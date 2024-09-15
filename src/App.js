import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import ChatBotHome from './Component/ChatBotHome';
import ChatBot1 from './Component/ChatBot1';
import Translator from './Component/Tranlator';
import About from './Component/About';
import FaqList from './Component/Faq';
import CreateFaq from './Component/CreateFaq';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>} />
        <Route path='/ChatBotHome' element={<ChatBotHome/>} />
        <Route path='/FruitChat' element={<ChatBot1/>} />
        <Route path='/Translator' element={<Translator/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Faq' element={<FaqList/>} />
        <Route path='/create-faq' element={<CreateFaq/>} />
      </Routes>
    </div>
  );
}

export default App;
