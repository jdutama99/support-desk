const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get current tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  //get user using the id ans the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc    Get current ticket
// @route   GET /api/ticket/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //get user using the id ans the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    req.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(ticket)
})

// @desc    create current tickets
// @route   POST/api/tickets
// @access  Private
const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('please add a product and description')
  }

  //get user using the id ans the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })
  res.status(200).json(ticket)
})

// @desc    delete current ticket
// @route   DELETE /api/ticket/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the id ans the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    req.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})
// @desc    update current ticket
// @route   PUT /api/ticket/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  //get user using the id ans the jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    req.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
}
