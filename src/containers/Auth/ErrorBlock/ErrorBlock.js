import React from "react";

export default function ErrorBlock({ errMsg }) {
  if (!errMsg) return null;
  const [flag, ...msg] = errMsg;
  return (
    <div>
      <p>{msg}</p>
    </div>
  );
}
