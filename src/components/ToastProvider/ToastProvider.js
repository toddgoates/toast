import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(newToastObject) {
    setToasts([...toasts, newToastObject]);
  }

  function deleteToast(id) {
    const toastIndex = toasts.findIndex((toast) => {
      return toast.id === id;
    });

    const newToasts = [...toasts];
    newToasts.splice(toastIndex, 1);

    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
