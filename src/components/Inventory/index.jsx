import { useEffect, useState, useRef } from "react";
import InventoryForm from "./InventoryForm";
import { withFirestore } from "../../Firestore";
import { Table } from "./table/";
import { MdDelete } from "react-icons/md";
import { Popup } from "../Popup";
import { DeleteWarningPopup } from "../DeleteWarnPopup";
import {Loader} from '../Loader'

const Inventory = ({ firestore }) => {
  const [showForm, setShowForm] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLowStockFilterEnabled, setLowStockFilterEnabled] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  const filterRef = useRef();

  useEffect(() => {
    const unSub = firestore.getData(setInventoryData);
    return () => unSub;
  }, []);

  return (
    <div>
      <div className="filter-wrapper">
        <p ref={filterRef} onClick={toggleFilter}>
          SHOW LOW STOCK
        </p>
        <button
          onClick={() => setDeleteWarning(true)}
          disabled={itemToBeDeleted.length < 1}
          className={
            itemToBeDeleted.length < 1
              ? `disabled-btn classic-btn del-btn`
              : `classic-btn del-btn`
          }
        >
          <MdDelete className="icon" /> DELETE SELECTED
        </button>
        <button className="classic-btn" onClick={() => setShowForm(true)}>
          <span className="icon">+</span>ADD TO INVENTORY
        </button>
      </div>
      {showForm && (
        <InventoryForm setShowForm={setShowForm} setShowPopup={setShowPopup} />
      )}
      {
        inventoryData.length > 0 ? 
        <Table
        inventoryData={inventoryData}
        isLowStockFilterEnabled={isLowStockFilterEnabled}
        setItemToBeDeleted={setItemToBeDeleted}
        itemToBeDeleted={itemToBeDeleted}
      />
      : 
      <Loader />
      }
      {showPopup && (
        <Popup popupText="Item added" setShowPopup={setShowPopup} />
      )}
      {deleteWarning && (
        <DeleteWarningPopup
          deleteItems={handleDelete}
          setDeleteWarning={setDeleteWarning}
        />
      )}
    </div>
  );
  function toggleFilter() {
    setLowStockFilterEnabled((prev) => !prev);
    filterRef.current.classList.toggle("filter-active");
  }
  function handleDelete() {
    if (itemToBeDeleted.length > 0) {
      itemToBeDeleted.forEach((id) => {
        firestore.deleteItems(id);
      });
      setItemToBeDeleted([]);
    }
  }
};


export default withFirestore(Inventory);
