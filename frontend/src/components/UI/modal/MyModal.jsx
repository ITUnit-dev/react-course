import React from "react";
import classes from "./MyModal.module.css";

function MyModal({ children, visible, setVisible }) {
  const rootClasses = [classes.MyModalStyle];
  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes.MyModalContent}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModal;
