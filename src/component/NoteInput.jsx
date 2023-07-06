import { useRef } from "react";

const NoteInput = ({ isTitleVisible, setIsTitleVisible }) => {
  const titleRef = useRef();
  const noteRef = useRef();

  function handleTitleVisibility() {
    setIsTitleVisible(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form submitted.");

    if (titleRef.current.innerText === "" || noteRef.current.innerText === "") {
      console.log("fields are empty");
      setIsTitleVisible(false);
    } else {
      let data = {
        title: titleRef.current.innerText,
        note: noteRef.current.innerText,
      };
      console.log(data);
    }
  }
  return (
    <section>
      <form
        className="px-4 border border-black/20 rounded-md"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {isTitleVisible && (
          <div className="relative">
            <div className="py-2 pointer-events-none  absolute">Title</div>
            <div
              className="py-2 outline-none"
              role="textbox"
              contentEditable="true"
              aria-multiline="true"
              ref={titleRef}
            ></div>
          </div>
        )}

        <div className="relative" onClick={handleTitleVisibility}>
          <div className="py-2 pointer-events-none  absolute">
            Take a note..
          </div>
          <div
            className="py-2 outline-none"
            role="textbox"
            contentEditable="true"
            aria-multiline="true"
            ref={noteRef}
          ></div>
        </div>

        {isTitleVisible && (
          <div className="flex justify-end">
            <button className="my-2 ml-auto py-1 px-6 hover:bg-black/5 rounded-md">
              Close
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default NoteInput;
