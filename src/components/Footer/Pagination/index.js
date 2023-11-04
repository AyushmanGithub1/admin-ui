import React from "react";
import styles from "./styles.module.css";

function Pagination({
  handleNextPagination,
  handlePrevPagination,
  handleFirstPagination,
  handleLastPagination,
}) {
  return (
    <div className={styles.container}>
      <button type="button" style={{backgroundColor:'#33333368'}} onClick={handleFirstPagination}>
        First
      </button>
      <button type="button" onClick={handlePrevPagination}>
        Prev
      </button>
      <button type="button" onClick={handleNextPagination}>
        Next
      </button>
      <button type="button" style={{backgroundColor:'#33333368'}} onClick={handleLastPagination}>
        Last
      </button>
    </div>
  );
}

export default Pagination;
