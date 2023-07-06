import { useState, useContext } from "react";
// asset
import plusIcon from "../assets/plus.svg";
// component
import Note from "../component/Note";
import NoteModal from "../modal/NoteModal";
import NoNotes from "../component/NoNotes";
// context
import { NotesContext } from "../context/NotesContext";

function Main() {
  const [isNoteModalActive, setIsNoteModalActive] = useState(false);

  // context
  const { notes } = useContext(NotesContext);

  function handleAddNote() {
    setIsNoteModalActive(true);
  }

  return (
    <main className="h-screen pt-[100px] overflow-y-scroll no-scrollbar">
      {notes.length === 0 ? (
        <NoNotes />
      ) : (
        <section className="px-1 pb-[97px]  grid grid-cols-2 lg:grid-cols-5 gap-4">
          {notes?.map((note) => (
            <Note
              key={note._id}
              note={note}
              triggerModalActive={setIsNoteModalActive}
            />
          ))}
        </section>
      )}

      <button
        className="bg-[#111111] w-16 h-16 rounded-full  flex justify-center items-center  fixed bottom-5 right-5"
        onClick={handleAddNote}
      >
        <img src={plusIcon} alt="add icon" />
      </button>

      {isNoteModalActive && (
        <NoteModal triggerModalActive={setIsNoteModalActive} />
      )}
    </main>
  );
}

export default Main;
