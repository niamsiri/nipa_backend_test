const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collection = new Schema({
    title: {
        type: String,
        required: [true, 'title required'],
    },
    description: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        required: [true, 'contact required'],
    },
    status: {
        type: String,
        default: "PENDING",
        enum: ['PENDING', 'ACCEPTED', 'RESOLVED', 'REJECTED'],
    }
}, { timestamps: true });

const ticketCollection = mongoose.model("tickets", collection);

const getTicketById = async (id) => {
    return await ticketCollection.findById(id)
}

const getTickets = async (query) => {
    return await ticketCollection.find(query).sort({ status: 1, updatedAt: -1 })
}

const insertTicket = async (data) => {
    return await ticketCollection.create(data);
}

const updateTicketById = async (id, data) => {
    return await ticketCollection.findOneAndUpdate({ _id: id }, data)
}

const deleteTicketById = async (id) => {
    return await ticketCollection.deleteOne({ _id: id });
}

module.exports = {
    getTicketById,
    getTickets,
    insertTicket,
    updateTicketById,
    deleteTicketById
}