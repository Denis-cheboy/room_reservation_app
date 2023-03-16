import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import Header from '../../components/Header/Header'
import Navbar from '../../components/navBar/Navbar'
import "./List.css"
import useFetch from '../../api'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
const List = () => {
  const location=useLocation()
  const [destination,setDestination]=useState(location.state.destination)
  const [date,setDate]=useState(location.state.date)
  const [options,setOptions]=useState(location.state.options)
  const [openDate,setOpenDate]=useState(false)
  const [min,setMin]=useState(undefined)
  const [max,setMax]=useState(undefined)
  
  const {data,isLoading,error,reFetch}=useFetch(`/hotels?city=${destination.toLowerCase()}&min=${min || 0}&max=${max || 2000}`)

  const handleSearch=()=>{
      reFetch()
  }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} onChange={e=>setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in-date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                onChange={item=>setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />}
            </div>
            <div className="lsItem">
                <label htmlFor="">Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Min Price <small>per night</small></span>
                    <input className="lsOptionInput" type="number" onChange={(e)=>setMin(e.target.value)}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Max Price <small>per night</small></span>
                    <input className="lsOptionInput" type="number" onChange={(e)=>setMax(e.target.value)}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input className="lsOptionInput" min={1} type="number" placeholder={options.adult}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input className="lsOptionInput" min={0}  placeholder={options.children} type="number"/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input className="lsOptionInput" type="number"  min={1} placeholder={options.room}/>
                  </div>
                </div>
            </div>
            <button className="search" onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            <div className="noHotelresults">
               {data.length===0 && 
               (
                <>
                 <p>No available {destination} hotels</p>
                 <span>Please use known cities or streets around {destination} area</span>
                </>
               )}
            </div>
            {isLoading?"Loading":
            <>
              {data.map(item=>(
                <SearchItem item={item} key={item._id}/>
              ))}
            </>
            } 
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
