import { useEffect } from "react";
import "../styles/app.css";

function Notification({ message, type = "default", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;