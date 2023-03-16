import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../api'
import { SearchContext } from '../../context/SearchContext'
import "./Reserve.css"
const Reserve = ({setOpen,hotelId}) => {
  const {data}=useFetch(`/hotels/list/rooms/${hotelId}`)
  const [selectedRooms,setSelectedRooms]=useState([])
  const {dates}=useContext(SearchContext)
  const navigate=useNavigate()
  
  const getDatesRange=(startDate,endDate)=>{
    const start=new Date(startDate)
    const end=new Date(endDate)
    const date=new Date(start.getTime())
    let list=[]
    while(date<=end){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }
    return list
  }

  const allDates=getDatesRange(dates[0].startDate,dates[0].endDate)
  
  const isAvailable=(roomNumber)=>{
    const isFound=roomNumber.unavailableDates.some(date=>allDates.includes(new Date(date).getTime()))
    return !isFound
  }
  
  const handleSelect=(e)=>{
    const checked=e.target.checked
    const value=e.target.value 
    setSelectedRooms(checked?[...selectedRooms,value]:selectedRooms.filter(item=>item!==value))
  }
  
  const handleClick=async()=>{
    try{
      await Promise.all(selectedRooms.map(roomId=>{
        const res=axios.put(`http://localhost:3500/api/rooms/availability/${roomId}`,{allDates:allDates})
        return res.data
      }))
      setOpen(false)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
    
  }
  
  console.log(data)
  
  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
            <span>Select your rooms:</span>
            {
              data.map(item=>(
                <div className="rItem">
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.description}</div>
                    <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                    <div className="rPrice">{item.price}</div>
                  </div>
                  <div className="rSelectRooms">
                     {item.roomNumbers.map(roomNumber=>(
                      <div className="room">
                        <label htmlFor="">{roomNumber.roomNumber}</label>
                        <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}/>
                      </div>
                     ))}
                  </div>
                </div>
              ))
            }
            <button className="rButton" onClick={handleClick}>Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve
