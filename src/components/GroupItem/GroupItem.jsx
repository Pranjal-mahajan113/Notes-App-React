import React from "react";
import styles from "./GroupItem.module.css";

const GroupItem = ({ name, onClick, color }) => {
  return (
    <div className={styles.groupItem} onClick={onClick}>
      <div className={styles.groupCircle} style={{ background: color }}>
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span>{name}</span>
    </div>
  );
};

export default GroupItem;
