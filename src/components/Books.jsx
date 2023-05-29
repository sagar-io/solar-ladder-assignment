import { NavLink } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { RiBankFill } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import {FirestoreContext} from "../Firestore";
import FireStore from '../Firestore'

export const Books = () => {
  return (
    <FirestoreContext.Provider value={new FireStore()}>
      <div className="books-wrapper">
        <div className="bold">BOOKS</div>
        <div className="books-navbar">
          <NavLink className="item" to="inventory">
            <BsShop />
            Inventory
          </NavLink>
          <NavLink className="item" to="items">
            <AiOutlineShop />
            Items
          </NavLink>
          <NavLink className="item" to="expenses">
            <RiBankFill />
            Expenses
          </NavLink>
        </div>
      </div>
      <Outlet />
    </FirestoreContext.Provider>
  );
};
