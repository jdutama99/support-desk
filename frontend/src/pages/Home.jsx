import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Do you need assistance?</h1>
        <p> Please choose from option below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to="/new-ticket" className="btn btn-block">
        <FaTicketAlt /> View My Ticket
      </Link>
    </>
  )
}

export default Home
