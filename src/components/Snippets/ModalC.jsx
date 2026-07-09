import * as React from "react";
import { createPortal } from "react-dom";

export default function ModalC({ isOpen, setIsOpen, info }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={info.head}
    >
      <div className="box modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="content">
          <h3>{'"' + info.head + '"'}</h3>
          <div className="mod-details">
            <b>{info.subhead}</b> {" " + info.details}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}