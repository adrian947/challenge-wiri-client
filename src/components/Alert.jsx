import React from "react";

export const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? "error" : "info"} alert`}>{alert.msg}</div>
  );
};
