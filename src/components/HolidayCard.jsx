import React from 'react'

const HolidayCard =({holiday})=>{
    return (
        <div className="holiday">
            <div>
                <p>{holiday.Year}</p>
            </div>
            <div>
                <img src={holiday.Poster !== "N/A" ? holiday.Poster : "http://via.placeholder.com/400"} alt={holiday.Title} />
            </div>
            <div>
                <span>{holiday.Type}</span>
                <h3>{holiday.Title}</h3>
            </div>
        </div>
    )
}

export default HolidayCard