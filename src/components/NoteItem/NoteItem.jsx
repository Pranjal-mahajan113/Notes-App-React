import React from "react";
import styles from "./NoteItem.module.css";

const NoteItem = ({ note: { content, createdAt } }) => {
  const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={styles.noteCard}>
      <p className={styles.noteText}>{content}</p>
      <span className={styles.noteTime}>{formattedDate}</span>
    </div>
  );
};

export default NoteItem;
