import React from 'react'
import './SuggestionCard.scss'

function SuggestionCard({product}) {
    console.log(product)
  return (
    <div className="suggestion_card">
        <div className="innersuggestion_card">
            <div className="img_section_s">
                 <img src={product?.image?.url} alt="" />
            </div>
            <h4>{product?.name}</h4>
        </div>
    </div>
  )
}

export default SuggestionCard