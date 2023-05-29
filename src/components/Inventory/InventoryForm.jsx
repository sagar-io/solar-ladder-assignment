import { useState, useRef } from "react";
import { ImgInput } from "./inputs/ImgInput";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Toggle } from "./inputs/Toggle";
import { categoryOptions, unitOptions, gstOptions } from "./inputs/optionsData";
import { withFirestore } from "../../Firestore";
import { AiFillCloseCircle } from "react-icons/ai";

const InventoryFormBase = ({
  firestore,
  preValues,
  setShowForm,
  setShowPopup,
}) => {
  const preLoadValues = preValues || null;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: preLoadValues });

  const [islowStockUnitsEnable, setIsLowStockUnitsEnable] = useState(
    preLoadValues ? preLoadValues.lowStockUnits : false
  );
  const [isTaxInclusive, setIstaxInclusive] = useState(
    preLoadValues ? preLoadValues.isTaxInclusive : false
  );
  const formName = !preLoadValues
    ? "CREATE ITEM"
    : `EDIT ITEM: ${preValues.itemName.toUpperCase()}`;
  const [imgFiles, setImgFiles] = useState([]);

  const myDate = new Date();

  return (
    <div className="inventory-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-header">
          <h2>{formName}</h2>
          <AiFillCloseCircle
            className="close-btn"
            onClick={handleOverlayClick}
          />
        </div>

        <div className="general-stock-details-wrapper">
          <div className="general-details-wrapper">
            <h3 className="heading">General Details</h3>
            <label className="mt-1">
              Upload Item Images
            </label>
            <ImgInput
              imgFiles={imgFiles}
              setImgFiles={setImgFiles}
              preLoadValues={preLoadValues}
            />

            <Input
              name="itemName"
              label="Item Name"
              type="text"
              register={register}
              errors={errors}
              errMsg="Enter atleast 2 Characters"
              validation={{
                required: true,
                maxLength: 20,
                minLength: 2,
              }}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Category"
                  options={categoryOptions}
                  className="category-dropdown"
                  rules={{ required: true }}
                  classNamePrefix="dropdown"
                />
              )}
            />
            <Input
              name="itemCode"
              label="Item Code"
              type="number"
              register={register}
              errors={errors}
              validation={{
                required: true,
                maxLength: 20,
                minLength: 4,
              }}
              errMsg="Enter atleast 4 Characters"
            />
            <Input
              name="itemDescription"
              type="text"
              label="Item Description"
              register={register}
              errors={errors}
            />
            <div>
              <input type="submit" value="Save" />
              {(!preLoadValues) && 
              <button onClick={handleResetForm} className="rst-btn">
                RESET
              </button>}
            </div>
          </div>

          <div className="stock-details-wrapper">
            <h3 className="heading">Stock Details</h3>
            <div className="unit-stock">
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={false}
                    placeholder="Unit"
                    options={unitOptions}
                    className="unit-dropdown"
                    classNamePrefix="dropdown"
                  />
                )}
              />
              <Input
                name="openingStock"
                type="number"
                label="Opening Stock"
                register={register}
                errors={errors}
                validation={{
                  required: true,
                }}
                errMsg="Required Field"
              />
            </div>

            <div className="label-input date-label-input">
              <input
                {...register("date")}
                defaultValue={myDate.toLocaleDateString("en-CA")}
                type="date"
              />
              <label className="label">As of Date</label>
            </div>

            <div className="low-stock-warn-wrapper">
              <p>Enable Low Stock Warning</p>
              <Toggle
                setToggle={setIsLowStockUnitsEnable}
                preSetValue={islowStockUnitsEnable}
              />
              {islowStockUnitsEnable && (
                <Input
                  name="lowStockUnits"
                  label="Low Stock Units"
                  register={register}
                  errors={errors}
                />
              )}
            </div>
            <h3 className="heading">Pricing Details</h3>
            <div className="price-tax-wrapper">
              <Input
                name="purchasePrice"
                label="Purchase Price"
                type="number"
                register={register}
                errors={errors}
                validation={{
                  required: true,
                  minLength: 1,
                }}
                errMsg="Required Field"
              />
              <p>Inclusive of tax</p>
              <Toggle
                setToggle={setIstaxInclusive}
                preSetValue={isTaxInclusive}
              />
            </div>

            <Controller
              name="gst"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={false}
                  placeholder="GST Tax Rate(%)"
                  options={gstOptions}
                  className="gst-dropdown"
                  classNamePrefix="dropdown"
                  rules={{ required: true }}
                  maxMenuHeight={200}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
  async function onSubmit(data) {
    if (data.category == undefined) data.category = {};
    if (data.unit == undefined) {
      data.unit = {};
    }
  
    data["isTaxInclusive"] = isTaxInclusive;
    if (data["gst"]) {
      if (isTaxInclusive) {
        data["afterTaxPrice"] = data.purchasePrice;
      } else {
        let tax = parseFloat(data["gst"].value);
        data["afterTaxPrice"] =
          (parseFloat(data.purchasePrice) * tax) / 100 +
          parseFloat(data.purchasePrice);
      }
    } else {
      data["gst"] = null;
      data["afterTaxPrice"] = data.purchasePrice;
    }
    if (!islowStockUnitsEnable) {
      data["lowStockUnits"] = null;
    }
    if (preValues) {
      firestore.updateDoc(preValues.id, imgFiles, preValues.images, data);
    } else {
      uploadImages(data);
    }
    handleOverlayClick();
    setShowPopup(true);
  }
  function handleOverlayClick() {
    setShowForm(false);
  }
  async function uploadImages(data) {
    await firestore.uploadImgs(imgFiles, data);
  }
 
  function handleResetForm() {
    setIsLowStockUnitsEnable(false);
    setIstaxInclusive(false);
    reset();
  }
};

const Input = ({ name, label, type, register, errors, errMsg, validation }) => (
  <div className="label-input">
    <input {...register(name, validation)} placeholder=" " type={type} />
    <label className="label">{label}</label>
    {errors[name] && <span className="err">{errMsg}</span>}
  </div>
);

const InventoryForm = withFirestore(InventoryFormBase);
export default InventoryForm;
