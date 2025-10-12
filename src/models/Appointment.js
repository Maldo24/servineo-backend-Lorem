const mongoose = require('mongoose');

const schedules_schema = new mongoose.Schema({
    starting_time: {
        type: Date,
        required: true,
        unique: false,
    },
    finishing_time: {type: Date},
    schedule_state: {
        type: String,
        enum: ['occupied', 'cancelled', 'booked'],
        required: true,
        unique: false,
    }
});

const appointment_schema = new mongoose.Schema({
    id_fixer: {
        type: String,
        required: true,
        unique: false
    },
    id_requester: {
        type: String,
        required: true,
        unique: false
    },
    selected_date: {
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },
    selected_date_state: {
        type: String,
        enum: ['available', 'occupied', 'partially-occupied'],
        required: true,
        unique: false,
        default: 'available'
    },
    schedules: [{
        type: schedules_schema,
        required: true,
        unique: true,
    }],
    current_requester_name: {
        type: String,
        required: true,
        unique: false,
    },
    appointment_type: {
        type: String,
        enum: ['virtual', 'presential'],
        required: true,
        unique: false,
        default: 'virtual'
    },
    appointment_description: {
        type: String,
        required: false,
        unique: false
    },
    place_id: {
        type: String,
        required: true,
    },
    link_id: {
        type: String,
        required: false,
        unique: true
    },
    current_requester_phone: {
        type: String,
        required: true,
        unique: false
    }
    
}, {timeStamps: true});

const Appointment = mongoose.model('Appointment', appointment_schema);

module.exports = Appointment;