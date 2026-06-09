import { Route, Routes } from "react-router-dom";
import Login from "./components/Entry/Login";
import Signup from "./components/Entry/Signup";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage/HomePage";
import ChooseQuestion from "./components/Practice/ChooseQuestion";
import StartRecording from "./components/Practice/StartRecording";


function App(){
  return(
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/questions" element={<ChooseQuestion/>}/>
        <Route path="/startRecording" element={<StartRecording/>}/>
      </Routes>
  );
}

export default App;
