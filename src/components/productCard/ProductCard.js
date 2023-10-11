import React from 'react'
import './ProductCard.scss'
import { AiOutlineHeart} from 'react-icons/ai'
import Rating from './Rating'

function ProductCard({ product }) {

    


    return (
        <div className="Product" >
            <div className="product-container">
                <div className="wishlist">
                    {/* <AiFillHeart className='wishlist_icon1'/> */}
                  <AiOutlineHeart className="wishlist_icon"/>
                   
                </div>
                <div className="product-img">
                    <div className="img-container">
                        <img src={product?.image.url} alt={product.name} id="img" />
                    </div>
                    <button className="buynow">View Details</button>
                </div>
                <div className="product-info">
                    <p className="title">
                        {product?.name}
                    </p>
                    <div className="mrp_price">
                        <p className='mrp'>Rs. <p className='cross'> {product?.mrp}</p></p>
                        <p className="price">Rs. {product?.price}</p>
                    </div>

                    <div className="star_rating">
                        <Rating rating={product?.rating} />
                        <p className='ratingcount'>({product?.ratingcount})</p>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default ProductCard