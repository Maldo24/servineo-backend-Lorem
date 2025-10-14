import * as dotenv from 'dotenv';
import db_connection from '../../database.js';
import Location from '../../models/Location.js';
import Appointment from '../../models/Appointment.js';

dotenv.config();

let connected = false;

async function set_db_connection() {
  if (!connected) {
    await db_connection();
    connected = true;
  }
}

//Ubicaciones
async function create_location(current_location) {
  await set_db_connection();
  const location = new Location(current_location);
  const location_saved = await location.save();
  return location_saved;
}
async function insert_one_location(current_location) {
  await set_db_connection();
  const location_saved = await Location.insertOne(current_location);
  return location_saved;
}

async function insert_many_locations(locations) {
  await set_db_connection();
  const locations_saved = await Location.insertMany(locations);
  return locations_saved;
}

//Citas
// TODO: revisar que devuelve este metodo
async function create_appointment(current_appointment) {
  try {
    await set_db_connection();
    const fixer_id = current_appointment.id_fixer;
    const requester_id = current_appointment.id_requester;
    const date_selected = current_appointment.selected_date;
    const time_starting = new Date(current_appointment.starting_time);
    const time_finishing = new Date(time_starting.getTime() + 60 * 60 * 1000);
    const current_diplay_name = current_appointment.display_name;
    const current_lat = current_appointment.lat;
    const current_lon = current_appointment.lon;
    const new_schedule = {
      starting_time: time_starting,
      finishing_time: time_finishing,
      schedule_state: 'booked',
      display_name: current_diplay_name,
      lat: current_lat,
      lon: current_lon,
    };

    const exists = await Appointment.findOne({
      id_fixer: fixer_id,
      id_requester: requester_id,
      selected_date: date_selected,
    });
    let apointment_updated;
    if (!exists) {
      current_appointment.schedules = [new_schedule];
      const appointment = new Appointment(current_appointment);
      // ? revisar que devuelve
      apointment_updated = await appointment.save();
    } else {
      await Appointment.updateOne(
        {
          id_fixer: fixer_id,
          id_requester: requester_id,
          selected_date: date_selected,
        },
        {
          $push: { schedules: new_schedule },
        },
      );
      apointment_updated = await Appointment.findOne({
        id_fixer: fixer_id,
        id_requester: requester_id,
        selected_date: date_selected,
      });
    }
    if (apointment_updated) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error('Error creating appointment: ' + err.message);
  }
}

async function insert_one_appointment(current_appointment) {
  await set_db_connection();
  const appointment_saved = await Appointment.insertOne(current_appointment);
  return appointment_saved;
}

async function insert_many_appointments(appointments) {
  await set_db_connection();
  const appontments_saved = await Appointment.insertMany(appointments);
  return appontments_saved;
}

async function create_appointment_with_fixer_requester(fixer_id, requester_id, appointment_data) {
  await set_db_connection();
  const appointment = new Appointment({
    ...appointment_data,
    id_fixer: fixer_id,
    id_requester: requester_id,
  });
  const appointment_saved = await appointment.save();
  return appointment_saved;
}

async function insert_one_appointment_with_fixer_requester(
  fixer_id,
  requester_id,
  appointment_data,
) {
  try {
    await set_db_connection();
    const appointment_saved = await Appointment.insertOne({
      ...appointment_data,
      id_fixer: fixer_id,
      id_requester: requester_id,
    });
    console.log('Cita registrada correctamente.');
    return appointment_saved;
  } catch (err) {
    console.log('Error, la cita no se ha podido registrar.');
    throw err;
  }
}

async function insert_many_appointments_with_fixers_requesters(appointments_data) {
  await set_db_connection();
  const appointments_saved = await Appointment.insertMany(appointments_data);

  return appointments_saved;
}

export {
  create_location,
  insert_one_location,
  insert_many_locations,
  create_appointment,
  insert_one_appointment,
  insert_many_appointments,
  create_appointment_with_fixer_requester,
  insert_one_appointment_with_fixer_requester,
  insert_many_appointments_with_fixers_requesters,
};

//console.log(location);

//create_location()
//    .then(location_saved => console.log(location_saved))
//    .catch(err => console.log(err))
