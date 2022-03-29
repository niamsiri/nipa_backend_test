const express = require('express')

const router = express()

const ticketModel = require("../models/tickets")

router.get('/:ticketId', (req, res) => {
    ticketModel.getTicketById(req.params.ticketId).then((result) => {
        res.send({ status: "SUCCESS", msg: "Get success.", result: result })
    }).catch((error) => {
        res.send({ status: "ERROR", msg: "Can't get book.", result: error })
    })
})

router.post('/list', (req, res) => {
    let model = {
        status: req.body.status ? req.body.status : { $ne: null },
    }
    ticketModel.getTickets(model).then((result) => {
        res.send({ status: "SUCCESS", msg: "Get success.", result: result })
    }).catch((error) => {
        res.send({ status: "ERROR", msg: "Can't get ticket.", result: error })
    })
})

router.post('/', (req, res) => {
    let model = {
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
    }
    ticketModel.insertTicket(model).then(() => {
        res.send({ status: "SUCCESS", msg: "Created success." })
    }).catch((error) => {
        res.send({ status: "ERROR", msg: "Can't create ticket.", result: error })
    })
})

router.put('/:ticketId', (req, res) => {
    let model = {
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
        status: req.body.status,
    }
    ticketModel.updateTicketById(req.params.ticketId, model).then(() => {
        res.send({ status: "SUCCESS", msg: "Updated success." })
    }).catch((error) => {
        res.send({ status: "ERROR", msg: "Can't update ticket.", result: error })
    })
})

router.put('/status/:ticketId', (req, res) => {
    let model = {
        status: req.body.status,
    }
    ticketModel.updateTicketById(req.params.ticketId, model).then(() => {
        res.send({ status: "SUCCESS", msg: "Status updated success." })
    }).catch((error) => {
        res.send({ status: "ERROR", msg: "Can't update status ticket.", result: error })
    })
})

module.exports = router