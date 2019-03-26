import React from "react";

export default function ErrorBlock({ errMsg, className }) {
  if (!errMsg) return null;
  const [flag, ...msg] = errMsg;

  return (
    <div style={{ width: "100%", padding: "10px" }} className={className}>
      <p>{msg}</p>
    </div>
  );
}
