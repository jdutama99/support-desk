import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import {
  getNotes,
  reset as notesReset,
  createNote,
} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import BackButton from '../components/BackButton'
import Modal from 'react-modal'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  //close ticket
  const onCloseTicket = (e) => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed Successfully')
    navigate('/tickets')
  }

  //submit note
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  //open modal
  const openModal = () => {
    setModalIsOpen(true)
  }
  //close modal
  const closeModal = () => {
    setModalIsOpen(false)
  }

  if (isLoading || notesIsLoading) {
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

        {ticket.status !== 'closed' && (
          <button onClick={openModal} className="btn">
            <FaPlus />
            Add
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note Text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <h2>Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onCloseTicket}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  )
}

export default Ticket
