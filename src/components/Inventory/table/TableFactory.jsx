import { HiPencil } from "react-icons/hi";
import { useState } from "react";
import InventoryForm from "../InventoryForm";
import { IoIosWarning } from "react-icons/io";
import AdjustStockForm from "../AdjustStockForm";
import { Popup } from "../../Popup";

export const TableFactory = ({
  itemName,
  itemCode,
  category,
  stockQuantity,
  stockOnHold,
  stockValue,
  purchasePrice,
  itemData,
  isLowStockFilterEnabled,
  setItemToBeDeleted,
  itemToBeDeleted,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showAdjustStockForm, setShowAdjustStockForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isLowStock =
    itemData.lowStockUnits &&
    parseInt(itemData.openingStock) <= parseInt(itemData.lowStockUnits);
  if (isLowStockFilterEnabled && !isLowStock) {
    return;
  }
  const isChecked = itemToBeDeleted.includes(itemData.id);

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleDeletedCheckbox}
          />
        </td>
        <td>{itemName}</td>
        <td>{itemCode}</td>
        <td>{category}</td>
        <td>{stockQuantity}</td>
        <td>{stockOnHold}</td>
        <td>₹ {stockValue}</td>
        <td>₹ {purchasePrice}</td>
        <td className="edit-btn" onClick={() => setShowForm(true)}>
          {isLowStock && <IoIosWarning className="warn-icon icon" />}
          <HiPencil className="icon edit-icon" />
        </td>
        <td className="adjust-btn">
          <span>
            <button onClick={() => setShowAdjustStockForm(true)}>
              ADJUST STOCK
            </button>
          </span>
        </td>
      </tr>
      {showForm && (
        <InventoryForm
          setShowForm={setShowForm}
          preValues={itemData}
          setShowPopup={setShowPopup}
        />
      )}
      {showAdjustStockForm && (
        <AdjustStockForm
          itemId={itemData.id}
          itemName={itemData.itemName}
          currentStock={itemData.openingStock}
          setShowAdjustStockForm={setShowAdjustStockForm}
        />
      )}
      {showPopup && (
        <Popup popupText="Item Updated" setShowPopup={setShowPopup} />
      )}
    </>
  );

  function handleDeletedCheckbox() {
    setItemToBeDeleted((prev) => {
      if (!isChecked) {
        return [...prev, itemData.id];
      } else {
        const i = prev.indexOf(itemData.id);
        if (i > -1) prev.splice(i, 1);
        return [...prev];
      }
    });
  }
};
