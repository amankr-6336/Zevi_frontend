import React, {  useState } from 'react'
import './Home.scss'
import {  useSelector } from 'react-redux';
import {  CiSearch } from 'react-icons/ci'
import backg from '../assets/2.jpg'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import SuggestionCard from '../components/suggestioncard/SuggestionCard';

function Home() {
  
  const[input,setInput]=useState('');
  const [open,setOpen]=useState(false);


  const navigate = useNavigate();

  const products = useSelector(state => state.appConfigReducer.products);
  console.log(products);
  const topProducts = products?.filter(product => product.ratingcount > 800);
  console.log(topProducts);
  const uniqueCategories = [...new Set(products?.map(product => product.style))];
  console.log(uniqueCategories);

  function handleSubmit() {
    navigate(`/collection/${input}`);
  }

  function handleChange(e){
    e.preventDefault();
    setInput(e.target.value);
    // console.log(input);
  }

  function handleToggle(){
    setOpen(!open)
  }

  




  return (
    <div className="home" >
      <div className="inner_home">
        <img src={backg} alt="" />
        <div className="search_section">
          <form onSubmit={handleSubmit}>
            <input autoComplete="off" onClick={handleToggle} onChange={(e) =>handleChange(e)} type="text" placeholder="Search.." name="search" />
            <button type="submit"><CiSearch id='searchicon' /></button>
          </form>
          <div className={open?"suggestion_box":"suggestion_boxc"}>
            <h5>Latest Trends</h5>
            <div className="trend_list">
            {
              
                topProducts?.map((product, index) => (
                  <h1 key={index}> <Link
                                        className="link"
                                        style={{textDecoration: 'none'}}
                                        to={`/collection/${product?.name.replace(/\s/g, '')}`}
                                    >
                                        <SuggestionCard product={product}/>
                                    </Link></h1>
                ))
              
            }
            </div>

            <h5>Popular suggestions</h5>
             
             <div className="sugg_list">
                
                {
                  uniqueCategories.map((category,index)=>(
                    <p key={index}>
                      <Link  className="link"
                                        style={{textDecoration: 'none',color:'black'}}
                                        to={`/collection/${category?.replace(/\s/g, '')}`}>
                                          {category}
                                        </Link>
                    </p>
                  ))
                }

             </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home