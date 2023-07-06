import { useContext } from "react";
// context
import { NoteEditContext } from "../context/NoteEditContext";

function Note({ note, triggerModalActive }) {
  const { dispatch } = useContext(NoteEditContext);

  function handleNoteClick() {
    dispatch({ type: "SET_NOTE", payload: note });
    triggerModalActive(true);
  }

  return (
    <div
      className="p-4 text-xl rounded-lg shadow hover:shadow-md shadow-accent-bg/20"
      onClick={handleNoteClick}
    >
      <p className="mb-2 font-medium pointer-events-none">{note.title}</p>
      <p className="pointer-events-none line-clamp-3">{note.note}</p>
    </div>
  );
}

export default Note;
