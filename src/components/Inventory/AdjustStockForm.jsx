import { useState, useEffect } from "react";
import {withFirestore} from '../../Firestore'

const AdjustStockForm = ({ itemId, itemName, currentStock, setShowAdjustStockForm, firestore }) => {
  const [operationalData, setOperationalData] = useState({
    operation: "+",
    finalStock: currentStock,
    adjustStock: 0,
    error: null
  });
  const { operation, finalStock, adjustStock, error} = operationalData;
  useEffect(() => {
    let finalStockVal;
    if(adjustStock == "" || adjustStock == " ") return
    if (operation == "+")
      finalStockVal = parseInt(currentStock) + parseInt(adjustStock);
    else finalStockVal = parseInt(currentStock) - parseInt(adjustStock);
    setOperationalData((prev) => ({
      ...prev,
      finalStock: finalStockVal,
    }));
  }, [adjustStock, operation]);

  return (
    <div className="adjust-stock-wrapper">
      <form>
        <h2 className="heading">Adjust Stock Quantity</h2>
        <p>
          <span className="bold">Item Name: </span>
          {itemName}
        </p>
        <p>
          <span className="bold">Current Stock: </span>
          {currentStock}
        </p>

        <p className="fade">Add or Reduce Stock</p>

        <div className="operation-input-container">
          <input
            type="radio"
            name="operation"
            value="+"
            defaultChecked
            id='inc'
            onClick={handleOperationalData}
          />
          <label htmlFor='inc'>Add(+)</label>
          <input
            type="radio"
            name="operation"
            value="-"
            id='dec'
            onClick={handleOperationalData}
          />
          <label htmlFor='dec'>Reduce(-)</label>
        </div>

        <div className="label-input">
          <input
            placeholder=" "
            type="number"
            min='0'
            max='999999'
            name="adjustStock"
            value={adjustStock}
            onChange={handleOperationalData}
          />
          <label className="label">Adjust Stock</label>
          {error && <span className="err">{error}</span>}
        </div>

        <p>
          <span className="bold">Final Stock: </span>
          {finalStock} PCS
        </p>

        <textarea
          cols='9'
          className="remarks-input"
          maxLength='20'
          type="text"
          minLength='9'
          placeholder="Remarks (optional)"
        />
        <div className="btn-container">
          <button className="del-btn" onClick={() => setShowAdjustStockForm(false)}>CANCEL</button>
          <button className="classic-btn" onClick={handleUpdateItem}>SAVE</button>
        </div>
      </form>
    </div>
  );
  function handleUpdateItem(e) {
    e.preventDefault();
    firestore.adjustDoc(itemId, {openingStock: finalStock})
    setShowAdjustStockForm(false)
  }
  function handleOperationalData(e) {
    if(e.target.name == "adjustStock" && parseInt(e.target.value) == NaN){
      setOperationalData(prev => ({
        ...prev,
        error: "Enter a valid number"
      }))
      return
    }
    setOperationalData((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  }
};

export default withFirestore(AdjustStockForm)