import { useContext } from "react";
import { createPortal } from "react-dom";
// component
import NoteModalInput from "../component/NoteModalInput";
// context
import { NoteEditContext } from "../context/NoteEditContext";

function NoteModal({ triggerModalActive }) {
  const { state, dispatch } = useContext(NoteEditContext);
  const portalElement = document.getElementById("portal");

  function handleClick(event) {
    event.stopPropagation();
    triggerModalActive(false);
    dispatch({ type: "RESET_NOTE" });
  }

  return createPortal(
    <div
      className="bg-accent-bg/80 w-full h-screen  fixed top-0 left-0"
      onClick={handleClick}
    >
      <NoteModalInput
        noteEditState={state}
        triggerModalActive={triggerModalActive}
      />
    </div>,
    portalElement
  );
}

export default NoteModal;
