import React, { useState } from "react";
import styles from "./CreateGroupModal.module.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const CreateGroupModal = ({ setShowModal, addGroup,groups }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleCreate = () => {
    const trimmedName = groupName.trim();

    if (!trimmedName || !selectedColor) return;

    // Minimum 2 characters validation
    if (trimmedName.length < 2) {
      alert("Group name must be at least 2 characters");
      return;
    }

    // Duplicate check
    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      alert("Group already exists");
      return;
    }

    addGroup(trimmedName, selectedColor);
    setShowModal(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setShowModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Create New Group</h2>

        <div className={styles.inputRow}>
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className={styles.colorRow}>
          <label>Choose colour</label>
          <div className={styles.colors}>
            {colors.map((color) => (
              <div
                key={color}
                className={`${styles.colorCircle} ${
                  selectedColor === color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        <button className={styles.createBtn} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
