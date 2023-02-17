import React from 'react'
import * as base from "../env";

import { useNavigate } from 'react-router-dom';



var url = base.BASE_URL_IMAGE

const HolidayCard =({holiday})=>{
    const navigate = useNavigate()
    return (
        
        <div className="holiday" onClick={()=>navigate(`/holiday_details/${holiday.HolidayID}`)}>
            <div>
                <p>{holiday.StartDate}</p>
            </div>
            <div>
                <img src={holiday.Image !== "N/A" ? url+holiday.Image : "http://via.placeholder.com/400"} alt={holiday.HolidayName} />
            </div>
            <div>
                <span>{holiday.Location}: KES {holiday.Price}</span>
                <h3>{holiday.HolidayName}</h3>
            </div>
        </div>
    )
}

export default HolidayCard