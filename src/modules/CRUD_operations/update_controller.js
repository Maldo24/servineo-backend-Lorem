import 'express';
import {
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
} from './update_service.js';
import {
  locationAttributeValidation,
  locationQueryValidation,
  dataExist,
  appointmentAttributeValidation,
} from './common_functions.js';

export async function updateLocationFieldsByDisplayName(req, res) {
  try {
    const { name, attributes } = req.query;
    if (name !== '') {
      return res.status(400).json({ message: 'Missing parameter: name.' });
    }
    await locationAttributeValidation(attributes, res);
    const data = await update_location_fields_by_display_name(name, attributes);
    const output_fail = 'Location data could not modified.';
    const output_success = 'Location data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating location data.' });
  }
}

export async function updateManyLocationsFieldsByDisplayName(req, res) {
  try {
    const { name, attributes } = req.query;
    if (name !== '') {
      return res.status(400).json({ message: 'Missing parameter: name' });
    }
    await locationAttributeValidation(attributes, res);
    const data = await update_many_locations_fields_by_display_name(name, attributes);
    const output_fail = 'Locations data could not modified.';
    const output_success = 'Locations data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating locations data.' });
  }
}

export async function updateLocationFieldsByPlaceId(res, req) {
  try {
    const { id, attributes } = req.query;
    if (id !== '') {
      return res.status(400).json({ message: 'Missing parameter: name' });
    }
    if (!/^[0-9]{7}$/.test(id)) {
      return res
        .status(400)
        .json({ message: 'Wrong parameter value: place_id must be 7 numbers.' });
    }
    await locationAttributeValidation(attributes, res);
    const data = await update_location_fields_by_place_id(id, attributes);
    const output_fail = 'Location data could not modified.';
    const output_success = 'Location data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating location data.' });
  }
}

export async function updateManyLocationsFieldsByPlaceId(res, req) {
  try {
    const { id, attributes } = req.query;
    if (id !== '') {
      return res.status(400).json({ message: 'Missing parameter: name' });
    }
    if (!/^[0-9]{7}$/.test(id)) {
      return res
        .status(400)
        .json({ message: 'Wrong parameter value: place_id must be 7 numbers.' });
    }
    await locationAttributeValidation(attributes);
    const data = await update_many_locations_fields_by_place_id(id, attributes);
    const output_fail = 'Locations data could not modified.';
    const output_success = 'Locations data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating locations data.' });
  }
}

export async function updateAllLocationsFields(res, req) {
  try {
    const { attributes } = req.query;
    await locationAttributeValidation(attributes, res);
    const data = await update_all_locations_fields(attributes);
    const output_fail = 'Locations data could not modified.';
    const output_success = 'Locations data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating locations data.' });
  }
}

export async function updateManyLocationsFieldsByQuery(res, req) {
  try {
    const { query, attributes } = req.query;
    await locationQueryValidation(query, res);
    await locationAttributeValidation(attributes, res);
    const data = await update_many_locations_fields_by_query(query, attributes);
    const output_fail = 'Locations data could not modified.';
    const output_success = 'Locations data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating locations data.' });
  }
}

// Appointments - Controladores faltantes

export async function updateAppointmentById(req, res) {
  try {
    const id = req.query.id;
    const attributes = req.body;

    if (!id || !attributes) {
      return res.status(400).json({ message: 'Missing parameters: required id and attributes.' });
    }

    const updateData = Object.fromEntries(
      Object.entries(attributes).filter((v) => v !== undefined && v !== null),
    );

    const modified = await update_appointment_by_id(id, updateData);

    res.status(200).json({ message: 'Updated succesfully', modified });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: 'Error updating appointment data.', modified: false, error: err.message });
  }
}

export async function updateManyAppointmentsByIds(req, res) {
  try {
    const { ids, attributes } = req.query;
    if (ids === '') {
      return res.status(400).json({ message: 'Missing parameter: ids' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_many_appointments_by_ids(ids, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAppointmentsByQuery(req, res) {
  try {
    const { query, attributes } = req.query;
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointments_by_query(query, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAllAppointments(req, res) {
  try {
    const { attributes } = req.query;
    await appointmentAttributeValidation(attributes, res);
    const data = await update_all_appointments(attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}
export async function updateAppointmentFieldsByFixerId(req, res) {
  try {
    const { fixer_id, attributes } = req.query;
    if (fixer_id === '') {
      return res.status(400).json({ message: 'Missing parameter: fixer_id.' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointment_fields_by_fixer_id(fixer_id, attributes);
    const output_fail = 'Appointment data could not modified.';
    const output_success = 'Appointment data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointment data.' });
  }
}

export async function updateManyAppointmentsByFixerId(req, res) {
  try {
    const { fixer_id, attributes } = req.query;
    if (fixer_id === '') {
      return res.status(400).json({ message: 'Missing parameter: fixer_id' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_many_appointments_by_fixer_id(fixer_id, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAppointmentFieldsByRequesterId(req, res) {
  try {
    const { requester_id, attributes } = req.query;
    if (requester_id === '') {
      return res.status(400).json({ message: 'Missing parameter: requester_id.' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointment_fields_by_requester_id(requester_id, attributes);
    const output_fail = 'Appointment data could not modified.';
    const output_success = 'Appointment data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointment data.' });
  }
}

export async function updateManyAppointmentsByRequesterId(req, res) {
  try {
    const { requester_id, attributes } = req.query;
    if (requester_id === '') {
      return res.status(400).json({ message: 'Missing parameter: requester_id' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_many_appointments_by_requester_id(requester_id, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAppointmentsByDateRange(req, res) {
  try {
    const { start_date, end_date, attributes } = req.query;
    if (start_date === '' || end_date === '') {
      return res.status(400).json({ message: 'Missing parameters: start_date or end_date' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointments_by_date_range(start_date, end_date, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAppointmentsByStatus(req, res) {
  try {
    const { status, attributes } = req.query;
    if (status === '') {
      return res.status(400).json({ message: 'Missing parameter: status' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointments_by_status(status, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}

export async function updateAppointmentsByType(req, res) {
  try {
    const { appointment_type, attributes } = req.query;
    if (appointment_type === '') {
      return res.status(400).json({ message: 'Missing parameter: appointment_type' });
    }
    await appointmentAttributeValidation(attributes, res);
    const data = await update_appointments_by_type(appointment_type, attributes);
    const output_fail = 'Appointments data could not modified.';
    const output_success = 'Appointments data modified. ';
    await dataExist(data, output_fail, output_success, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating appointments data.' });
  }
}
