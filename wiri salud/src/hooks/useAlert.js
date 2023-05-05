import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({});

  const showAlert = ({ msg, error }) => {
    setAlert({
      msg,
      error,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  return { alert, showAlert };
};
