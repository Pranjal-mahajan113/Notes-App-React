import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesPanel from "./components/NotesPanel/NotesPanel";
import CreateGroupModal from "./components/CreateGroupModal/CreateGroupModal";

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const addGroup = (name, color) => {
    const newGroup = {
      id: Date.now(),
      name: name,
      color: color,
    };
    setGroups([...groups, newGroup]);
  };

  const addNote = (text) => {
    if (!selectedGroup || !text.trim()) return;
    const newNote = {
      id: Date.now(),
      content: text,
      groupId: selectedGroup.id,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const filteredNotes = notes.filter(
    (note) => note.groupId === selectedGroup?.id,
  );

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={styles.app}>
      {/* 🖥 DESKTOP VIEW */}
      {!isMobile && (
        <>
          <Sidebar
            groups={groups}
            setSelectedGroup={setSelectedGroup}
            setShowModal={setShowModal}
          />

          <NotesPanel
            selectedGroup={selectedGroup}
            notes={filteredNotes}
            addNote={addNote}
          />
        </>
      )}

      {/* 📱 MOBILE VIEW */}
      {isMobile && (
        <>
          {!showNotes ? (
            <Sidebar
              groups={groups}
              setSelectedGroup={(group) => {
                setSelectedGroup(group);
                setShowNotes(true);
              }}
              setShowModal={setShowModal}
            />
          ) : (
            <NotesPanel
              selectedGroup={selectedGroup}
              notes={filteredNotes}
              addNote={addNote}
              isMobile={true}
              goBack={() => setShowNotes(false)}
            />
          )}
        </>
      )}

      {showModal && (
        <CreateGroupModal
          setShowModal={setShowModal}
          addGroup={addGroup}
          groups={groups}
        />
      )}
    </div>
  );
};

export default App;
