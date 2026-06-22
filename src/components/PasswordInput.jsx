"use client";

import { useState } from "react";

export default function PasswordInput({ className = "", ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`password-field ${className}`}>
      <input className="field pr-12" type={visible ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="password-toggle"
        aria-label={visible ? "Hide password" : "Show password"}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.7 10.7 0 0 1 21 12a12.2 12.2 0 0 1-3 4.2M6.6 6.7A12 12 0 0 0 3 12s3.3 6 9 6c1 0 2-.2 2.8-.5" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.3-6 9-6 9 6 9 6-3.3 6-9 6-9-6-9-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>
        )}
      </button>
    </div>
  );
}
