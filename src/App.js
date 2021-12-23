import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/login';
import MainMenu from './pages/mainmenu';
import UserDetails from './pages/userDetails';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="dashboard" element={<MainMenu/>}/>
        <Route path="user/:userId" element={<UserDetails/>}/>
        <Route path="*" element={
          <section>
            <div>
              <p style={{textAlign:"center"}}>PAGE NOT FOUND</p>
            </div>
          </section>
        }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
