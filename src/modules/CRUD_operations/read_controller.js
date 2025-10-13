// read_controller.js
require('express');
const {
  get_all_locations,
  get_location_by_display_name,
  get_many_locations_by_display_name,
  get_location_by_place_id,
  get_many_locations_by_place_id,
  get_locations_by_query_projection,
  get_all_appointments,
  get_appointment_by_query_projection,
  get_requester_schedules_by_fixer_month,
  get_all_requester_schedules_by_fixer_month
} = require('./read_service'); // llamamos al service
const {
  locationAttributeValidation,
  dataExist, 
  locationProjectionValidation
} = require('./common_functions');

export async function getAllLocations(){
  try{
    const data = await get_all_locations();
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data founded. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationByDisplayName(req, res){
  try{
    const { name } = req.query;
    if(!name){
      return res.status(400).json({ message: 'Missing parameter: name.'});  
    }
    const data = await get_location_by_display_name(name);
    const output_fail = 'No location data found.';
    const output_success = 'Location data found. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing location data.' });
  }
}

export async function getManyLocationsByDisplayName(req, res){
  try{
    const { name } = req.query;
    if(!name){
      return res.status(400).json({ message: 'Missing parameter: name.'});
    }
    const data = await get_many_locations_by_display_name(name);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationByPlaceId(req, res){
  try{
    const { id } = req.query;
    if(!id){
      return res.status(400).json({ message: 'Missing parameter value: place_id.'});
    }
    if(!(/^[0-9]{7}$/.test(id))){
      return res.status(400).json({ message: 'Wrong parameter value: place_id must be 7 numbers.'});
    }
    const data = await get_location_by_place_id(id);
    const output_fail = 'No location data found.';
    const output_success = 'Location data found. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing location data.' });
  }
}

export async function getManyLocationsByPlaceId(req, res){
  try{
    const { id } = req.query;
    if(!id){
      return res.status(400).json({ message: 'Missing parameter value: place_id.'});
    }
    if(!(/^[0-9]{7}$/.test(id))){
      return res.status(400).json({ message: 'Wrong parameter value: place_id must be 7 numbers.'});
    }
    const data = await get_many_locations_by_place_id(id);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

export async function getLocationsByQueryProjection(req, res){
  try{
    const { query, projection } = req.query;
    if(!query){
      return res.status(400).json({ message: 'Missing query in request body.' });
    }
    locationAttributeValidation(query, res);
    locationProjectionValidation(projection, res);
    const data = await get_locations_by_query_projection(query, projection);
    const output_fail = 'No locations data found.';
    const output_success = 'Locations data found. ';
    dataExist(data, output_fail, output_success);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error accessing locations data.' });
  }
}

// Obtener todas las citas
export async function getAllAppointments(req, res){
  try{
    const data = await get_all_appointments();
    const output_fail = 'No appointments found.';
    const output_success = 'Appointments data found. ';
    dataExist(data, output_fail, output_success);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments.' });
  }
}

// Obtener citas por query específica
export async function getAppointmentByQueryProjection(req, res){
  try{
    const { query } = req.body; // query vendría en el body
    const { projection } = req.body; // opcional
    if(!query){
      return res.status(400).json({ message: 'Missing query in request body.' });
    }
    const data = await get_appointment_by_query_projection(query, projection);
    const output_fail = 'No appointments found for the given query.';
    const output_success = 'Appointments data found. ';
    dataExist(data, output_fail, output_success);
  }catch (error){
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments by query.' });
  }
}

// Obtener horarios de un requester en un mes específico
export async function getRequesterSchedulesByFixerMonth(req, res){
  try{
    const { fixer_id, requester_id, month } = req.query;
    if(!fixer_id){
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if(!requester_id){
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if(!month){
      return res.status(400).json({ message: 'Missing required query parameters: month.' });
    }
    const data = await get_requester_schedules_by_fixer_month(fixer_id, requester_id, month);
    const output_fail = 'No schedules found for this requester in the specified month.';
    const output_success = 'Schedules found for this requester. ';
    dataExist(data, output_fail, output_success);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error fetching requester schedules by fixer and month.' });
  }
}

// Obtener todos los horarios de otros requesters de un fixer en un mes específico
export async function getAllRequesterSchedulesByFixerMonth(req, res){
  try{
    const { fixer_id, requester_id, month } = req.query;
    if(!fixer_id){
      return res.status(400).json({ message: 'Missing required query parameters: fixer_id.' });
    }
    if(!requester_id){
      return res.status(400).json({ message: 'Missing required query parameters: requester_id.' });
    }
    if(!month){
      return res.status(400).json({ message: 'Missing required query parameters: month.' });
    }
    const data = await get_all_requester_schedules_by_fixer_month(fixer_id, requester_id, month);
    const output_fail = 'No schedules found for other requesters in this month.';
    const output_success = 'Schedules found for all requesters except this. ';
    dataExist(data, output_fail, output_success);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error fetching all requester schedules by fixer and month.' });
  }
}