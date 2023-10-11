import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { getProducts } from './redux/slice/appconfigSlice';
import Navbar from "./components/navbar/Navbar";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";


function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch])

  return (
    <div className="app">
      <Navbar />
       <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/collection/:categoryId" element={<Collection/>}/>

      </Routes>
    </div>
  );
}

export default App;
