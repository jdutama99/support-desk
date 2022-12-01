import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'

import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  //close ticket
  const onCloseTicket = (e) => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed Successfully')
    navigate('/tickets')
  }

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3> Something went wrong</h3>
  }
  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton />
          <h2>
            Ticket ID:{ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status != 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onCloseTicket}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  )
}

export default Ticket