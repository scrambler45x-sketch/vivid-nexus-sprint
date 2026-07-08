import React from "react";

export default function Clause({ index, icon, title, children }) {
  return (
    <div className="vn-clause">
      <div className="vn-clause__index">// {index}</div>
      <div className="vn-clause__head">
        {icon}
        <h3>{title}</h3>
      </div>
      <p>{children}</p>
    </div>
  );
}
