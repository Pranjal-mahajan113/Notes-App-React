import React from "react";
import styles from "./Sidebar.module.css";
import plus from "../../assets/Plusicon.png";
import GroupItem from "../GroupItem/GroupItem";

const Sidebar = ({ groups, setSelectedGroup, setShowModal }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>Pocket Notes</div>

      <div className={styles.groupsList}>
      

        {groups.map((group) => (
          <GroupItem
            key={group.id}
            name={group.name}
            color={group.color}
            onClick={() => setSelectedGroup(group)}
          />
        ))}
      </div>

      <button className={styles.addBtn} onClick={() => setShowModal(true)}>
        <img src={plus} alt="add" />
      </button>
    </div>
  );
};

export default Sidebar;
