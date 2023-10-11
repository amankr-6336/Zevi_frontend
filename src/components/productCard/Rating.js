import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'

function Rating({rating}) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
  
    // Create an array of stars to display
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full-star"><AiFillStar style={{ color: 'orange',fontSize:'1.2rem',}}/></span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">&#9733;</span>);
    }
  
    // Calculate the number of empty stars needed to fill a total of 5 stars
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star"><AiOutlineStar style={{ color: 'orange',fontSize:'1.2rem',}} /></span>);
    }
  return (
    <div className="star-rating" style={{display:'inline'}}>{stars}</div>
  )
}

export default Rating