import { useEffect } from "react";

function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-600";

  return (
    <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow ${bgColor} animate-slide-in`}>
      {message}
    </div>
  );
}

export default Notification;