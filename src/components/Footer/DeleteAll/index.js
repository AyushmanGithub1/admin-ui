import React from "react";
import styles from './styles.module.css';

function DeleteAll({ handleDeleteAll }) {
  return (
    <button className={styles.btn_delete_all} type="button" onClick={handleDeleteAll}>
      Delete Selected
    </button>
  );
}

export default DeleteAll;
