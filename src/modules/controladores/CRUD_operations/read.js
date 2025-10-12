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
async function get_all_locations(){
    try{
        await set_db_connection();
        const locations = await Location.find();
        console.log('Acceso correcto a todas las ubicaciones.');
        return locations;
    }catch(err){
        console.log('Error, no se pudo acceder a todas las ubicaciones: ', err);
        throw err;
    }
}

async function get_location_by_display_name(name){
    try{
        await set_db_connection();
        const locations = await Location.findOne({display_name: name});
        console.log('Acceso correcto a la ubicacion.');
        return locations;
    }catch(err){
        console.log('Error, no se pudo acceder a la ubicacion: ', err);
        throw err;
    }
}

async function get_location_by_place_id(id){
    try{
        await set_db_connection();
        const locations = await Location.findOne({place_id: id});
        console.log('Acceso correcto a la ubicacion.');
        return locations;
    }catch(err){
        console.log('Error, no se pudo acceder a la ubicacion: ', err);
        throw err;
    }
}

async function get_locations_by_query_projection(query, projection){
    try{
        await set_db_connection();
        const locations = await Location.find(query, projection);
        console.log('Acceso correcto a las ubicaciones.');
        return locations;
    }catch(err){
        console.log('Error, no se pudo acceder a las ubicaciones: ', err);
        throw err;
    }
}

//Citas
async function get_all_appointments(){
    try{
        await set_db_connection();
        const appointments = await Appointment.find();
        console.log('Acceso correcto a todas las citas.');
        return appointments;
    }catch(err){
        console.log('Error, no se pudo acceder a todas las citas.');
        throw err;
    }
}

async function get_schedules_by_fixer_month(fixer_id, month){
    try{
        current_date = new Date(Date.now());
        current_year = current_date.getFullYear();
        target_month = month - 1;
        start_date = new Date(2024, target_month, 1);
        finish_date = new Date(2024, month, 0, 23, 59, 59);
        await set_db_connection();
        const appointment = await Appointment.find({
            id_fixer: fixer_id, 
            selected_date: {
                $gte: start_date, 
                $lte: finish_date
            }
        }, 
        {
            id_fixer: false,
            id_requester: false,
            selected_date: false,
            selected_date_state: false,
            current_requester_name: false,
            appointment_type: false,
            appointment_description: false,
            place_id: false,
            link_id: false,
            current_requester_phone: false
        });
        console.log('Acceso correcto a todas las citas.');
        return appointment
    }catch(err){
        console.log('Error, no se pudo acceder a la cita.');
    }
}

module.exports = {
    get_all_locations,
    get_location_by_display_name,
    get_location_by_place_id,
    get_locations_by_query_projection,
    get_all_appointments,
    get_schedules_by_fixer_month
}