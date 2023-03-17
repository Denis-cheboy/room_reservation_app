import React, { useState } from 'react'
import "./Featured.css"
import { useEffect } from 'react'
import axios from "axios"
import hotel1 from "../../asserts/hotel1.jpeg"
import hotel2 from "../../asserts/hotel2.jpeg"
import hotel3 from "../../asserts/hotel3.jpeg"
const Featured = () => {
  const [data,setData]=useState(null)
  useEffect(()=>{
     const fetchFeaturedCities=async()=>{
        try{
          const res=await axios.get("https://room-reservation-api.onrender.com/hotels/count/countByCity?cities=Sagana,Kagio,Karatina")
          setData(res.data)
        }
        catch(err){
            console.log(err)
        }
     }
     fetchFeaturedCities()
  },[])
  return (
    data &&(
        <div className="featured">
            <div className="featuredItem">
                <img src={hotel1} alt="" className="featuredImg"/>
                <div className="featuredTitles">
                    <h1>Sagana</h1>
                    <h2>{`${data[0]} Properties`}</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src={hotel2} alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Kagio</h1>
                    <h2>{`${data[1]} Properties`}</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src={hotel3} alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Karatina</h1>
                    <h2>{`${data[2]} Properties`}</h2>
                </div>
            </div>
        </div>
    )
        
  )
}

export default Featured
