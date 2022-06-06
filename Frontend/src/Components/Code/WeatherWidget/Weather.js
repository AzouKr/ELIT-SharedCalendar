import React from 'react'
import {WeatherWidget} from "@daniel-szulc/react-weather-widget"
import './styles.scss'

function Weather() {
  return (
    <div>
        <WeatherWidget
                      apiKey='6aa07a95e14395eb6d633d827d997567'
                      location='Algiers'
                      tempUnit="C"
                      windSpeedUnit="kmph"
                      lang="en"
                    />
    </div>
  )
}

export default Weather