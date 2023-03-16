import React from 'react'
import "./PropertyList.css"
import hotel15 from "../../asserts/hotel15.jpg"
import hotel6 from "../../asserts/hotel6.jpeg"
import hotel7 from "../../asserts/hotel5.jpeg"
import hotel8 from "../../asserts/hotel9.jpg"
import axios from "axios"
import { useEffect,useState } from 'react'
const PropertyList = () => {
  const [propertyList,setPropertyList]=useState(null)
  const images=[
    hotel15,hotel15,hotel6,hotel7,hotel8
  ]
  useEffect(()=>{
    const fetchProperties=async()=>{
        try{
          const res=await axios.get("http://localhost:3500/api/hotels/type/countByType")
          setPropertyList(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchProperties()
  },[])
  return (
    <div className="pList">
        {propertyList && propertyList.map((property,idx)=>(
            <div className="pListItem">
                <img src={images[idx]} alt="" className='pListImg'/>
                <div className="pListTitles">
                    <h1>{property.type}</h1>
                    <h2>{`${property.count} ${property.type}`}</h2>
                </div>
            </div>

        ))}
    </div>
  )
}

export default PropertyList
