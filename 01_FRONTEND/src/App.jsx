import { Route, Routes } from "react-router-dom";
import Login from "./components/Entry/Login";
import Signup from "./components/Entry/Signup";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage/HomePage";
import ChooseQuestion from "./components/Practice/ChooseQuestion";
import StartRecording from "./components/Practice/StartRecording";
import AnalyzePage from "./components/Practice/AnalyzePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Analytics from "./Analytics/Analytics";
import SettingsPage from "./SettingsPage/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<HomePage />} />


      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>

        <Route path="/questions" element={<ChooseQuestion />} />
        <Route path="/startRecording" element={<StartRecording />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/review/:sessionId" element={<ReviewPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Route>


      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default App;
