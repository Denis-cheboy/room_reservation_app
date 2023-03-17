import React, { useContext, useState } from 'react'
import "./Hotel.css"
import Navbar from "../../components/navBar/Navbar"
import Header from "../../components/Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MailList from "../../components/MailList/MailList"
import Footer from "../../components/footer/Footer"
import room1 from "../../asserts/room1.jpg"
import room2 from "../../asserts/room2.jpg"
import room3 from "../../asserts/room3.jpg"
import room4 from "../../asserts/room5.jpg"
import room5 from "../../asserts/room5.jpg"
import room6 from "../../asserts/room6.jpg"
import room7 from "../../asserts/room7.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from "../../api"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'
const Hotel = () => {
  const [slideNumber,setSlideNumber]=useState(0)

  const {dates,options}=useContext(SearchContext)
  const [open,setOpen]=useState(false)
  const {id}=useParams()
  const {data,loading,error}=useFetch(`/hotels/${id}`)
  const [openModal,setOpenModal]=useState(false)
  const photos=[
      room1,
      room2,
      room7,
      room4,
      room5,
      room6
  ]
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  const MILISECONDS_PER_DAY=1000*60*60*24
  const dayDifference=(date1,date2)=>{
    const timeDiff=Math.abs(date2.getTime()-date1.getTime())
    const diffDays=Math.ceil(timeDiff/MILISECONDS_PER_DAY)
    return diffDays
  }

  const days=dayDifference(dates[0].endDate,dates[0].startDate)

  const handleOpen=(i)=>{
    setSlideNumber(i)
    setOpen(true)
  }

  const handleClick=()=>{
   
    if(user){
       setOpenModal(true)
    }
    else{
      navigate("/login",{replace:true})
    }

  }
  const handleMove=(side)=>{
     let newSlideNumber;
     if(side==="left"){
      newSlideNumber=slideNumber===0?5:slideNumber-1
     }
     else{
      newSlideNumber=slideNumber===5?0:slideNumber+1
     }
     setSlideNumber(newSlideNumber)
  }

  return (
   <div>
    <Navbar/>
    <Header type="list"/>
    <div className="hotelContainer">
     {open &&
      <div className="slider">
         <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
         <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("left")}/>
         <div className="sliderWrapper">
          <img src={photos[slideNumber]} alt="" className="sliderImg" />
         </div>
         <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("right")}/>
      </div>
      }
      <div className="hotelWrapper">
        <button className="bookNow">Reserve or Book Now</button>
        <h1 className="hotelTitle">{data.title}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot}/>
          <span>{data.address}</span>
        </div>
        <span className='hotelDistance'>Excellent Location - {data.distance}m from center</span>
        <span className="hotelPriceHighlight">
          Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
        </span>
        <div className="hotelImages">
          {data?.photos?.length>0? (data.photos?.map((img,idx)=>(
            <div className="hotelImgWrapper">
              <img src={img} alt=""  onClick={()=>handleOpen(idx)}/>
            </div>
          )))
          :
          (photos?.map((img,idx)=>(
            <div className="hotelImgWrapper">
              <img src={img} alt=""  onClick={()=>handleOpen(idx)}/>
            </div>
          )))
         }
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <div className="hotelTitle">{data.title}</div>
            <p className="hotelDesc">{data.description}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for {days}-nights stay</h1>
            <span>
              Located in the real heart of krakow, This property has an excellent location score of 9.8!
            </span>
            <h2>
              <b>${days*data.cheapestPrice*options.room}</b> ({days} nights)
            </h2>
            <button onClick={()=>handleClick()}>Reserve or Book Now!</button>
          </div>
        </div>
      </div>
    </div>
    <MailList/>
    <Footer/>
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
   </div>
  )
}

export default Hotel
