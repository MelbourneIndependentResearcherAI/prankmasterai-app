import { useNavigate } from "react-router-dom";
import "./Inbox.css";

export default function Inbox() {
  const navigate = useNavigate();

  const threads = [
    {
      id: "sms-1",
      title: "SMS Thread",
      preview: "Tap to open SMS conversation…",
      route: "/chat/sms-1",
    },
    {
      id: "messenger-1",
      title: "Messenger Chat",
      preview: "Tap to open Messenger thread…",
      route: "/messenger/messenger-1",
    },
  ];

  return (
    <div className="inbox-container">
      <h1 className="inbox-title">Inbox</h1>

      <div className="thread-list">
        {threads.map((t) => (
          <div
            key={t.id}
            className="thread-item"
            onClick={() => navigate(t.route)}
          >
            <div className="thread-title">{t.title}</div>
            <div className="thread-preview">{t.preview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
