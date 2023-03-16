import React from 'react'
import "./SearchItem.css"
import hotel1 from "../../asserts/hotel1.jpeg"
import { Link } from 'react-router-dom'
const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img src={item.photos[0]?item.photos[0]:hotel1} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">{item.title}</h1>
          <span className="siDistance">{item?.distance}m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubTitle">Studio aprtment with Air Conditioning</span>
          <span className="siFeatures">{item.desc}</span>
          <span className="siCancelOp">Free Cancellation</span>
          <span className="siCancelOpSubTitle">You can cancel later, so lock in this great price today</span>

        </div>
        <div className="siDetails">
          {item.ratting?
          <div className="siRatting">
            <span>Excellent</span>
            <button>{item.ratting}</button>
          </div>
          :
          <div className="siRatting">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          }
          <div className="siDetailText">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siPrice">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className='siCheckButton'>See availability</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default SearchItem
