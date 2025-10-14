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
async function update_location_fields_by_display_name(name, attributes) {
  await set_db_connection();
  return await Location.findOneAndUpdate(
    { display_name: name },
    { $set: attributes },
    { new: true },
  );
}

async function update_many_locations_fields_by_display_name(names, attributes) {
  await set_db_connection();
  await Location.updateMany({ display_name: names }, { $set: attributes });
  const locations = await Location.find({ display_name: names }, { $set: attributes });
  return locations;
}

async function update_location_fields_by_place_id(id, attributes) {
  await set_db_connection();
  return await Location.findOneAndUpdate({ place_id: id }, { $set: attributes }, { new: true });
}

async function update_many_locations_fields_by_place_id(ids, attributes) {
  await set_db_connection();
  await Location.updateMany({ place_id: ids }, { $set: attributes });
  const locations = await Location.find({ place_id: ids }, { $set: attributes });
  return locations;
}

async function update_many_locations_fields_by_query(query, attributes) {
  await set_db_connection();
  await Location.updateMany(query, { $set: attributes });
  const locations = await Location.find(query, { $set: attributes });
  return locations;
}

async function update_all_locations_fields(attributes) {
  await set_db_connection();
  await Location.updateMany({}, { $set: attributes });
  const locations = await Location.find({}, { $set: attributes });
  return locations;
}

//Citas:
//async function update_appointment_fields_by_display_name(){

//}

//Appointments
async function update_appointment_by_id(id, attributes) {
  try {
    await set_db_connection();

    // !atributos hay que tener cuidado con schedule
    // TODO: desestructurar schedule

    const docUpdate = await Appointment.findByIdAndUpdate(
      id,
      { $set: attributes },
      { new: true, runValidators: true },
    );

    if (docUpdate) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

//

async function update_many_appointments_by_ids(ids, attributes) {
  await set_db_connection();
  await Appointment.updateMany({ _id: { $in: ids } }, { $set: attributes });
  const appointments = await Appointment.find({ _id: { $in: ids } });
  return appointments;
}

async function update_appointments_by_query(query, attributes) {
  await set_db_connection();
  await Appointment.updateMany(query, { $set: attributes });
  const appointments = await Appointment.find({ query }, { $set: attributes });
  return appointments;
}
async function update_all_appointments(attributes) {
  await set_db_connection();
  await Appointment.updateMany({}, { $set: attributes });
  const appointments = await Appointment.find({}, { $set: attributes });
  return appointments;
}
async function update_appointment_fields_by_fixer_id(fixer_id, attributes) {
  await set_db_connection();
  return await Appointment.findOneAndUpdate(
    { id_fixer: fixer_id },
    { $set: attributes },
    { new: true },
  );
}

async function update_many_appointments_by_fixer_id(fixer_id, attributes) {
  await set_db_connection();
  await Appointment.updateMany({ id_fixer: fixer_id }, { $set: attributes });
  const appointments = await Appointment.find({ id_fixer: fixer_id });
  return appointments;
}

async function update_appointment_fields_by_requester_id(requester_id, attributes) {
  await set_db_connection();
  return await Appointment.findOneAndUpdate(
    { id_requester: requester_id },
    { $set: attributes },
    { new: true },
  );
}

async function update_many_appointments_by_requester_id(requester_id, attributes) {
  await set_db_connection();
  await Appointment.updateMany({ id_requester: requester_id }, { $set: attributes });
  const appointments = await Appointment.find({ id_requester: requester_id });
  return appointments;
}

async function update_appointments_by_date_range(start_date, end_date, attributes) {
  await set_db_connection();
  await Appointment.updateMany(
    {
      selected_date: { $gte: start_date, $lte: end_date },
    },
    { $set: attributes },
  );
  const appointments = await Appointment.find({
    selected_date: { $gte: start_date, $lte: end_date },
  });
  return appointments;
}

async function update_appointments_by_status(status, attributes) {
  await set_db_connection();
  await Appointment.updateMany({ selected_date_state: status }, { $set: attributes });
  const appointments = await Appointment.find({ selected_date_state: status });
  return appointments;
}

async function update_appointments_by_type(appointment_type, attributes) {
  await set_db_connection();
  await Appointment.updateMany({ appointment_type: appointment_type }, { $set: attributes });
  const appointments = await Appointment.find({ appointment_type: appointment_type });
  return appointments;
}

export {
  update_location_fields_by_display_name,
  update_many_locations_fields_by_display_name,
  update_location_fields_by_place_id,
  update_many_locations_fields_by_place_id,
  update_all_locations_fields,
  update_many_locations_fields_by_query,
  update_appointment_by_id,
  update_many_appointments_by_ids,
  update_appointments_by_query,
  update_all_appointments,
  update_appointment_fields_by_fixer_id,
  update_many_appointments_by_fixer_id,
  update_appointment_fields_by_requester_id,
  update_many_appointments_by_requester_id,
  update_appointments_by_date_range,
  update_appointments_by_status,
  update_appointments_by_type,
};
