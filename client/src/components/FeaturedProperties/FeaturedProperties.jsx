import React from 'react'
import "./FeaturedProperties.css"
import axios from "axios"
import { useState,useEffect } from 'react'
import hotel4 from "../../asserts/hotel9.jpg"
import hotel5 from "../../asserts/hotel10.jpg"
import hotel6 from "../../asserts/hotel7.jpg"
import hotel7 from "../../asserts/hotel12.jpg"

const FeaturedProperties = () => {
  const [featured,setFeatured]=useState(null)
  const images=[
    hotel4,hotel5,hotel6,hotel7
  ]
  useEffect(()=>{
    const fetchFeatured=async()=>{
        try{
          const res=await axios.get("https://room-reservation-api.onrender.com/hotels?featured=true&limit=4")
          setFeatured(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchFeatured()
  },[])
  return (
    <div className="fp">
        {featured && featured.map((feature,idx)=>(
            <div className="fpItem">
                <img src={feature.photos[0]?feature.photos[0]:images[idx]} alt="" className="fpImg" />
                <span className="fpName">{feature.title}</span>
                <span className="fpCity">{feature.city}</span>
                <span className="fpPrice">Starting from {feature.cheapestPrice}</span>
                {feature.rattings?
                <div className="fpRatting">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
                :
                <div className="fpRatting">
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
                }
            </div>
        ))}
        
    </div>
  )
}

export default FeaturedProperties
