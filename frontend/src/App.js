import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import "./App.css";
import { WebSocketProvider } from "./Utils/webSocketContext";

import AuthScreen from "./Screens/AuthScreen";
import Dashboard from "./Screens/Dashboard";
import Notification from "./Components/Notification";

function App() {
  return (
    <Router>
      <div className="App">
        <Notification />
        <Routes>
          <Route path="/" element={<Navigate to="/authentication/login" />} />
          <Route path="/authentication/*" element={<AuthScreen />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
