import React from "react";
import styles from "./NotesPanel.module.css";
import NotepanelIMG from "../../assets/Notespanelimg.png";
import SendLight from "../../assets/sendlightimg.png";
import SendDark from "../../assets/senddarkimg.png";
import NoteItem from "../NoteItem/NoteItem";
import ArrowImg from "../../assets/arrow.png"
import { useState } from "react";

const NotesPanel = ({ selectedGroup, notes, addNote ,isMobile,goBack}) => {
  const [inputText, setInputText] = useState("");
  const [isFoused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    addNote(inputText);
    setInputText("");
  };

  // Case 1: when group not selected
  if (!selectedGroup) {
    return (
      <div className={styles.notesPanel}>
        <div className={styles.emptyContent}>
          <img src={NotepanelIMG} alt="notes" />
          <h2>Pocket Notes</h2>
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.notesPanel}>
      <div className={styles.topBar}>
        {isMobile && (
          <img src={ArrowImg} alt="ArrowIamage" className={styles.backArrow} onClick={goBack} />
        )}
        <div
          className={styles.groupCircle}
          style={{ backgroundColor: selectedGroup?.color }}
        >
          {selectedGroup.name.slice(0, 2).toUpperCase()}
        </div>
        <span>{selectedGroup.name}</span>
      </div>

      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {notes.length === 0 ? (
          <p>No messages yet...</p>
        ) : (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        )}
      </div>

      {/* Text Area */}
      <div className={styles.textArea}>
        <div className={styles.textAreaWrapper}>
          <textarea
            type="text"
            placeholder="Enter your text here.........."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <img
            src={isFoused ? SendDark : SendLight}
            alt="send"
            className={styles.sendIcon}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
