import {createPortal} from "react-dom";
import "./Modal.css";

export default function Modal({isOpen, onClose, title, children}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button onClick={onClose}>x</button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
