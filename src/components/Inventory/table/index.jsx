import { TableFactory } from "./TableFactory";

export const Table = ({
  inventoryData,
  isLowStockFilterEnabled,
  setItemToBeDeleted,
  itemToBeDeleted,
}) => {
  const tableElements = inventoryData.map((doc, key) => (
    <TableFactory
      key={`${doc.itemName}-${key}`}
      itemName={doc.itemName}
      itemCode={doc.itemCode}
      category={doc.category.value}
      stockQuantity={doc.openingStock}
      stockOnHold={(doc.unit.value) ? `0 ${doc.unit.value}`: `0`}
      stockValue={parseInt(doc.openingStock) * parseInt(doc.purchasePrice)}
      purchasePrice={doc.afterTaxPrice}
      itemData={doc}
      isLowStockFilterEnabled={isLowStockFilterEnabled}
      setItemToBeDeleted={setItemToBeDeleted}
      itemToBeDeleted={itemToBeDeleted}
    />
  ));

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>
              <div
                className={
                  itemToBeDeleted.length > 0
                    ? "active select-all"
                    : "select-all"
                }
                type="checkbox"
                onClick={handleSelectAll}
              ></div>
            </th>
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Category</th>
            <th>Stock Quantity</th>
            <th>Stock on Hold</th>
            <th>Stock Value</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>{tableElements}</tbody>
      </table>
    </div>
  );
  function handleSelectAll() {
    if (itemToBeDeleted.length > 0) {
      setItemToBeDeleted([])
    } else {
      const allItemArr = []
      inventoryData.map(item => {
          allItemArr.push(item.id)
      })
      setItemToBeDeleted(allItemArr)
    }
  }
};
