import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/index";

import NavBar from "./components/NavBar";


import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com"; 

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <h1>Project 5 </h1>
      </header>
      <Routes>

        <Route path="/profile/:id" element={<Profile/>} />
        <Route path={"/register"} element={<Register/>} />
     

      </Routes>
    </div>
    </GoogleOAuthProvider>

  );
}

export default App;
