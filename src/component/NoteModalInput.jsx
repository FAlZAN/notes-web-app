import { useState, useEffect, useContext } from "react";
// asset
import closeIcon from "../assets/close.svg";
import tickIcon from "../assets/tick.svg";
import deleteIcon from "../assets/delete.svg";
// third-party import
import axios from "axios";
// context
import { NotesContext } from "../context/NotesContext";
import { NoteEditContext } from "../context/NoteEditContext";
import { AuthContext } from "../context/AuthContext";

function NoteModalInput({ noteEditState, triggerModalActive }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const { notes, dispatch } = useContext(NotesContext);
  const { dispatch: NoteEditDispatch } = useContext(NoteEditContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (noteEditState.note !== null) {
      setTitle(noteEditState.note.title);
      setNote(noteEditState.note.note);
    }
  }, [noteEditState]);

  const fieldCheck = title === "" && note === "" ? false : true;

  // update notes into context locally
  function updateNotesLocally(idToUpdateLocally) {
    const indexToFind = idToUpdateLocally;
    const indexToUpdate = notes.findIndex((note) => note._id === indexToFind);
    const newNote = { _id: indexToFind, title, note };
    notes[indexToUpdate] = newNote;
    const newNotes = notes;
    dispatch({ type: "SET_NOTES_INITIAL", payload: newNotes });
  }

  // api requests
  async function postNewNote(data) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes`,
        {
          user_id: isAuthenticated._id,
          ...data,
        },
        {
          headers: {
            "x-access-token": isAuthenticated?.token,
          },
        }
      );

      const insertedId = response.data.insertedId;

      // updating local state with new note only when post request is
      // successfull
      if (response.status === 201) {
        dispatch({
          type: "SET_NOTES",
          payload: { _id: insertedId, title, note },
        });
      }

      // triggering note input modal close
      triggerModalActive(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(_id) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/${_id}`,
        {
          headers: {
            "x-access-token": isAuthenticated?.token,
          },
        }
      );

      // deleting note from local state when delete request is successfull
      if (response.status === 200) {
        dispatch({ type: "DELETE_NOTE", payload: { _id: _id } });
        triggerModalActive(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNote(_id, data, idToUpdateLocally) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/notes/${_id}`,
        {
          ...data,
        },
        {
          headers: {
            "x-access-token": isAuthenticated?.token,
          },
        }
      );
      if (response.status === 200) {
        updateNotesLocally(idToUpdateLocally);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // event handler
  function handleSubmit(event) {
    event.preventDefault();

    if (noteEditState.note !== null) {
      if (
        noteEditState.note.title !== title ||
        noteEditState.note.note !== note
      ) {
        updateNote(
          noteEditState.note._id,
          { title, note },
          noteEditState.note._id
        );
      }

      triggerModalActive(false);
    } else {
      if (title !== "" || note !== "") {
        postNewNote({ title, note });
      }
    }

    // reseting NoteEditContext back to null
    NoteEditDispatch({ type: "RESET_NOTE" });
  }

  function handleDelete() {
    const _id = noteEditState.note._id;
    deleteNote(_id);
    NoteEditDispatch({ type: "RESET_NOTE" });
  }

  function handleClose() {
    triggerModalActive(false);
  }

  return (
    <div
      className="bg-white w-11/12 max-w-lg px-4 text-xl font-poppins rounded-lg  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      onClick={(event) => event.stopPropagation()}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="w-full py-4 outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <textarea
            className="w-full outline-none resize-none"
            placeholder="Take a note.."
            cols="30"
            rows="8"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          ></textarea>
        </div>

        <div className="pt-2 pb-4  flex justify-end">
          {/* delete button */}
          {noteEditState.note !== null && (
            <button
              className="bg-red-500 w-12 h-12 mr-2 rounded-full  flex justify-center items-center"
              type="button"
              onClick={handleDelete}
            >
              <img className="w-7 h-7" src={deleteIcon} alt="close icon" />
            </button>
          )}

          {/* submit button */}
          <button
            type={fieldCheck ? "submit" : "button"}
            className="bg-accent-bg w-12 h-12 rounded-full  flex justify-center items-center"
            onClick={!fieldCheck ? handleClose : null}
          >
            <img
              className="w-7 h-7"
              src={fieldCheck ? tickIcon : closeIcon}
              alt="close icon"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteModalInput;
