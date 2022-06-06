import React from 'react'
import './NewRdv.css'

function NewRdv({setdisplayformstate}) {
    const showwindow = () => {
        setdisplayformstate({bool2:true,blur:0.1,disable:"none"})
      }
  return (
    <div>
        <i className="fa fa-calendar-plus-o fa-lg" onClick={showwindow} aria-hidden="true"></i>
        <button className="bouton-rendezvous" onClick={showwindow}> Nouveau rendez-vous</button>
    </div>
  )
}

export default NewRdv