import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Inbox from "./components/Inbox";
import ChatWindow from "./components/ChatWindow";
import MessengerThread from "./components/MessengerThread";
import Settings from "./components/Settings";
import About from "./components/About";
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/chat/:threadId" element={<ChatWindow />} />
          <Route path="/messenger/:threadId" element={<MessengerThread />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
