import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Books } from "./components/Books";
import Inventory from "./components/Inventory";
import { NotAvailable } from "./components/NotAvailable";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";

export const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/books/inventory')
  }, [])
  return (
    <div className="app">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />}>
          <Route path="/books/inventory" element={<Inventory />} />
          <Route path="/books/*" element={<NotAvailable />} />
        </Route>
        <Route path="/*" element={<NotAvailable />}/>
      </Routes>
    </div>
  );
};
