require('dotenv').config();

const db_connection = require('../../../database');
const Location = require('../../../models/Location');
const Appointment = require('../../../models/Appointment');

let connected = false;

async function set_db_connection(){
    if(!connected){
        await db_connection();
        connected = true;
    }
}

//Ubicaciones
async function create_location(current_location){
    try{
        await set_db_connection();
        const location = new Location(current_location);
        const location_saved = await location.save();
        console.log('Ubicacion registrada correctamente.');
        return location_saved;
    }catch(err){
        console.log('Error, la ubicacion no se ha podido registrar: ', err);
        throw err;
    }
}

async function insert_one_location(current_location){
    try{
        await set_db_connection();
        const location_saved = await Location.insertOne(current_location);
        console.log('Ubicacion registrada correctamente.');
        return location_saved;
    }catch(err){
        console.log('Error, la ubicacion no se ha podido registrar: ', err);
        throw err;
    }
}

async function insert_many_locations(locations){
    try{
        await set_db_connection();
        const locations_saved = await Location.insertMany(locations);
        console.log('Ubicaciones registradas correctamente.');
        return locations_saved;
    }catch(err){
        console.log('Error, las ubicaciones no se han podido registrar: ', err);
        throw err;
    }
}

//Citas
async function create_appointment(current_appointment){
    try{
        await set_db_connection();
        const appointment = new Appointment(current_appointment);
        const appointment_saved = await appointment.save();
        console.log('Cita registrada correctamente.');
        return appointment_saved;
    }catch(err){
        console.log('Error, la cita no se ha podido registrar.');
        throw err;
    }
}

async function insert_one_appointment(current_appointment){
    try{
        await set_db_connection();
        const appointment_saved = await Appointment.insertOne(current_appointment);
        console.log('Citas registrada correctamente.');
        return appointment_saved;
    }catch(err){
        console.log('Error, la cita no se ha podido registrar.');
        throw err;
    }
}

async function insert_many_appointments(appointments){
    try{
        await set_db_connection();
        const appontments_saved = await Appointment.insertMany(appointments);
        console.log('Citas registradas correctamente.');
        return appontments_saved;
    }catch(err){
        console.log('Error, las citas no se han podido registrar.');
        throw err;
    }
}

module.exports = {
    create_location,
    insert_one_location,
    insert_many_locations,
    create_appointment,
    insert_one_appointment,
    insert_many_appointments
}

//console.log(location);

//create_location()
//    .then(location_saved => console.log(location_saved))
//    .catch(err => console.log(err))