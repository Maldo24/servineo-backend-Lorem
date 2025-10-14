// read_controller.js
import 'express';
import {
  get_all_locations,
  get_location_by_display_name,
  get_many_locations_by_display_name,
  get_location_by_place_id,
  get_many_locations_by_place_id,
  get_locations_by_query_projection,
  get_all_appointments,
  get_appointment_by_query_projection,
  get_all_requester_schedules_by_fixer_month,
  get_requester_schedules_by_fixer_month,
  get_appointment_by_id,
  get_many_appointments_by_ids,
  get_appointments_by_fixer_id,
  get_appointments_by_requester_id,
  get_appointments_by_date_range,
  get_appointments_by_fixer_and_date,
  get_appointments_by_requester_and_date,
  get_appointments_by_status,
  get_appointments_by_type,
  get_requester_schedules_by_fixer_day,
  get_all_requester_schedules_by_fixer_day,
  get_modal_form_appointment,
  get_meeting_status
} from './read_service.js'; // llamamos al service
import {
  locationQueryValidation,
  dataExist,
  locationProjectionValidation,
} from './common_functions.js';

export async function getAllLocations(req, res) {
  try {
    const data = await get_all_locations();
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data founded. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationByDisplayName(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Missing parameter: name.' });
    }
    const data = await get_location_by_display_name(name);
    const output_fail = 'No location data found.';
    const output_success = 'Location data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing location data.' });
  }
}

export async function getManyLocationsByDisplayName(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Missing parameter: name.' });
    }
    const data = await get_many_locations_by_display_name(name);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationByPlaceId(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Missing parameter value: place_id.' });
    }
    if (!/^[0-9]{7}$/.test(id)) {
      return res
        .status(400)
        .json({ message: 'Wrong parameter value: place_id must be 7 numbers.' });
    }
    const data = await get_location_by_place_id(id);
    const output_fail = 'No location data found.';
    const output_success = 'Location data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing location data.' });
  }
}

export async function getManyLocationsByPlaceId(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Missing parameter value: place_id.' });
    }
    if (!/^[0-9]{7}$/.test(id)) {
      return res
        .status(400)
        .json({ message: 'Wrong parameter value: place_id must be 7 numbers.' });
    }
    const data = await get_many_locations_by_place_id(id);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationsByQueryProjection(req, res) {
  try {
    const { query, projection } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Missing query in request body.' });
    }
    await locationQueryValidation(query, res);
    await locationProjectionValidation(projection, res);
    const data = await get_locations_by_query_projection(query, projection);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

// Obtener todas las citas
export async function getAllAppointments(req, res) {
  try {
    const data = await get_all_appointments();
    const output_fail = 'No appointments found.';
    const output_success = 'Appointments data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments.' });
  }
}

// Obtener citas por query específica
export async function getAppointmentByQueryProjection(req, res) {
  try {
    const { query } = req.body; // query vendría en el body
    const { projection } = req.body; // opcional
    if (!query) {
      return res.status(400).json({ message: 'Missing query in request body.' });
    }
    const data = await get_appointment_by_query_projection(query, projection);
    const output_fail = 'No appointments found for the given query.';
    const output_success = 'Appointments data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments by query.' });
  }
}

// Obtener horarios de un requester en un mes específico
// TODO: fix, controladores deben devolver siempre status codes, dataExists no debe existir
export async function getRequesterSchedulesByFixerMonth(req, res) {
  try {
    const { fixer_id, requester_id, month } = req.query;
    if (!fixer_id) {
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if (!requester_id) {
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if (!month) {
      return res.status(400).json({ message: 'Missing required query parameters: month.' });
    }
    const data = await get_requester_schedules_by_fixer_month(fixer_id, requester_id, month);
    const output_fail = 'No schedules found for this requester in the specified month.';
    const output_success = 'Schedules found for this requester. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching requester schedules by fixer and month.' });
  }
}

// Obtener todos los horarios de otros requesters de un fixer en un mes específico
// TODO: fix, controladores deben devolver siempre status codes, dataExists no debe existir
export async function getAllRequesterSchedulesByFixerMonth(req, res) {
  try {
    const { fixer_id, requester_id, month } = req.query;
    if (!fixer_id) {
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if (!requester_id) {
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if (!month) {
      return res.status(400).json({ message: 'Missing required query parameters: month.' });
    }
    const data = await get_all_requester_schedules_by_fixer_month(fixer_id, requester_id, month);
    const output_fail = 'No schedules found for other requesters in this month.';
    const output_success = 'Schedules found for all requesters except this. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching all requester schedules by fixer and month.' });
  }
}

export async function getAppointmentById(req, res) {
  try {
    const { id } = req.query;
    if (id === '') {
      return res.status(400).json({ message: 'Missing parameter: id.' });
    }
    const data = await get_appointment_by_id(id);
    const output_fail = 'Appointment not found.';
    const output_success = 'Appointment found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointment data.' });
  }
}

export async function getManyAppointmentsByIds(req, res) {
  try {
    const { ids } = req.query;
    if (ids === '') {
      return res.status(400).json({ message: 'Missing parameter: ids' });
    }
    const data = await get_many_appointments_by_ids(ids);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByFixerId(req, res) {
  try {
    const { fixer_id } = req.query;
    if (fixer_id === '') {
      return res.status(400).json({ message: 'Missing parameter: fixer_id.' });
    }
    const data = await get_appointments_by_fixer_id(fixer_id);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByRequesterId(req, res) {
  try {
    const { requester_id } = req.query;
    if (requester_id === '') {
      return res.status(400).json({ message: 'Missing parameter: requester_id.' });
    }
    const data = await get_appointments_by_requester_id(requester_id);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByDateRange(req, res) {
  try {
    const { start_date, end_date } = req.query;
    if (start_date === '' || end_date === '') {
      return res.status(400).json({ message: 'Missing parameters: start_date or end_date' });
    }
    const data = await get_appointments_by_date_range(start_date, end_date);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByFixerAndDate(req, res) {
  try {
    const { fixer_id, date } = req.query;
    if (fixer_id === '' || date === '') {
      return res.status(400).json({ message: 'Missing parameters: fixer_id or date' });
    }
    const data = await get_appointments_by_fixer_and_date(fixer_id, date);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByRequesterAndDate(req, res) {
  try {
    const { requester_id, date } = req.query;
    if (requester_id === '' || date === '') {
      return res.status(400).json({ message: 'Missing parameters: requester_id or date' });
    }
    const data = await get_appointments_by_requester_and_date(requester_id, date);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByStatus(req, res) {
  try {
    const { status } = req.query;
    if (status === '') {
      return res.status(400).json({ message: 'Missing parameter: status' });
    }
    const data = await get_appointments_by_status(status);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getAppointmentsByType(req, res) {
  try {
    const { appointment_type } = req.query;
    if (appointment_type === '') {
      return res.status(400).json({ message: 'Missing parameter: appointment_type' });
    }
    const data = await get_appointments_by_type(appointment_type);
    const output_fail = 'Appointments not found.';
    const output_success = 'Appointments found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting appointments data.' });
  }
}

export async function getRequesterSchedulesByFixerDay(req, res) {
  try {
    const { fixer_id, requester_id, searched_date } = req.query;

    if (!fixer_id) {
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if (!requester_id) {
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if (!searched_date) {
      return res.status(400).json({ message: 'Missing required query parameters: searched_date.' });
    }

    // Convertir searched_date a objeto Date
    const date = new Date(searched_date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for searched_date.' });
    }

    const data = await get_requester_schedules_by_fixer_day(fixer_id, requester_id, date);
    const output_fail = 'No schedules found for this requester on the specified date.';
    const output_success = 'Schedules found for this requester. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching requester schedules by fixer and day.' });
  }
}

export async function getAllRequesterSchedulesByFixerDay(req, res) {
  try {
    const { fixer_id, requester_id, searched_date } = req.query;

    if (!fixer_id) {
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if (!requester_id) {
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if (!searched_date) {
      return res.status(400).json({ message: 'Missing required query parameters: searched_date.' });
    }

    // Convertir searched_date a objeto Date
    const date = new Date(searched_date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for searched_date.' });
    }

    const data = await get_all_requester_schedules_by_fixer_day(fixer_id, requester_id, date);
    const output_fail = 'No schedules found for other requesters on this date.';
    const output_success = 'Schedules found for all requesters except this. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching all requester schedules by fixer and day.' });
  }
}

export async function getModalFormAppointment(req, res) {
  try {
    const { fixer_id, requester_id, appointment_date, start_hour } = req.query;

    if (!fixer_id) {
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if (!requester_id) {
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if (!appointment_date) {
      return res
        .status(400)
        .json({ message: 'Missing required query parameters: appointment_date.' });
    }
    if (!start_hour && start_hour !== 0) {
      return res.status(400).json({ message: 'Missing required query parameters: start_hour.' });
    }

    // Convertir appointment_date a objeto Date
    const date = new Date(appointment_date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for appointment_date.' });
    }

    // Validar que start_hour sea un número
    const hour = parseInt(start_hour);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      return res.status(400).json({ message: 'Invalid start_hour. Must be between 0 and 23.' });
    }

    const data = await get_modal_form_appointment(fixer_id, requester_id, date, hour);
    const output_fail = 'No appointment found for the specified parameters.';
    const output_success = 'Appointment modal data found. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching modal form appointment data.' });
  }
}

export async function getMeetingStatus(req, res){
  try{
    const { id_requester, id_fixer, selected_date, starting_time } = req.body;
    if(!id_requester || !id_fixer || !selected_date || !starting_time){
      res.status(400).json({ message: 'Missing parameter function' });
    }
    const { name, status } = await get_meeting_status(id_requester, id_fixer, selected_date, starting_time);
    console.log(name, status);
    res.status(200).json({ message: 'Meeting status successfully accessed', name,  status});
  }catch(err){
    res.status(500).json({ message: 'Error updating appointment data', name: "", status: "", error: err.message });
  }
}