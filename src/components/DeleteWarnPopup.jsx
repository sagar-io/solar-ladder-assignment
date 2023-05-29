export const DeleteWarningPopup = ({ deleteItems, setDeleteWarning }) => {
    return (
      <div className="warn-overlay">
        <div className="inner">
          <h3>Delete Selected Inventory Items?</h3>
          <p>Inventory Items Selected will be permanently deleted, Proceed ?</p>
          <div className="flex">
          <button className="del-btn" onClick={() => setDeleteWarning(false)}>CANCEL</button>
          <button
            className="classic-btn"
            onClick={() => {
              deleteItems();
              setDeleteWarning(false);
            }}
          >
            DELETE
          </button>
          </div>
          
        </div>
      </div>
    );
  };