import React, { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import "./Header.css"
import {useNavigate} from "react-router-dom"
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
const Header = ({type}) => {
    const navigate=useNavigate()
    const {dispatch}=useContext(SearchContext)
    const [destination,setDestination]=useState("")
    const [openDate,setOpenDate]=useState(false)
    const [openOptions,setOpenOptions]=useState(false)
    const [options,setOptions]=useState({
        adult:1,
        children:0,
        room:1
    })

    const {user}=useContext(AuthContext)
    const [date,setDate]=useState([
        {
            startDate:new Date(),
            endDate:new Date(),
            key:"selection"
        }
    ])
    const handleOption=(option,type)=>{
        setOptions((prev)=>({...prev,[option]:type==="i"?options[option]+1:options[option]-1}))
    }
    
    const handleSearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates:date,options}})
        navigate("/hotels",{state:{destination,date,options}})
    }
  return (
    <div className="header">
        <div className={type==="list"?"headerContainer listMode":"headerContainer"}>

            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi}/>
                    <span>Airport taxis</span>
                </div>
            </div>
            { type !=="list" &&
            <>
            <h1 className="headerTitle">A lifetime of discounts? Its Genius.</h1>
            <p className="headerDesc">Get Rewarded for your travels- unlock instant savings of 10% or more with e free DenoBooking account</p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                    <input type="text" onChange={(e)=>setDestination(e.target.value)} placeholder='Where are you going?' className='headerSearchInput'/>
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                    <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                    {openDate &&
                    <DateRange
                    editableDateInputs={true}
                    onChange={item=>setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                    />
                    }
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                    <span className='headerSearchText' onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adults ${options.children} Children ${options.room} Room` }</span>
                    {openOptions &&
                    <div className="options">
                        <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" onClick={()=>handleOption("adult","d")} disabled={options.adult<=1}>-</button>
                                <span className="optionCounterNumber">{options.adult}</span>
                                <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" onClick={()=>handleOption("children","d")} disabled={options.children<=0}>-</button>
                                <span className="optionCounterNumber">{options.children}</span>
                                <button className="optionCounterButton"onClick={()=>handleOption("children","i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton"onClick={()=>handleOption("room","d")} disabled={options.room<=1}>-</button>
                                <span className="optionCounterNumber">{options.room}</span>
                                <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="headerSearchItem">
                    <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
            </div>
            </>
            }
             
        </div>
    </div>
  )
}

export default Header
