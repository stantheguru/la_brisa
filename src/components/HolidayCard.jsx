import React from 'react'

const HolidayCard =({holiday})=>{
    console.log(JSON.stringify(holiday))
    return (
        
        <div className="holiday">
            <div>
                <p>{holiday.StartDate}</p>
            </div>
            <div>
                <img src={holiday.Image !== "N/A" ? holiday.Image : "http://via.placeholder.com/400"} alt={holiday.HolidayName} />
            </div>
            <div>
                <span>{holiday.Location}</span>
                <h3>{holiday.HolidayName}</h3>
            </div>
        </div>
    )
}

export default HolidayCard