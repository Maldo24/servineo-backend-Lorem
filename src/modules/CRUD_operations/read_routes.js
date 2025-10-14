import { Router } from 'express';
import {
  getAllLocations,
  getLocationByDisplayName,
  getManyLocationsByDisplayName,
  getLocationByPlaceId,
  getManyLocationsByPlaceId,
  getLocationsByQueryProjection,
  getAllAppointments,
  getAppointmentByQueryProjection,
  getRequesterSchedulesByFixerMonth,
  getAllRequesterSchedulesByFixerMonth,
  getAppointmentById,
  getManyAppointmentsByIds,
  getAppointmentsByFixerId,
  getAppointmentsByRequesterId,
  getAppointmentsByDateRange,
  getAppointmentsByFixerAndDate,
  getAppointmentsByRequesterAndDate,
  getAppointmentsByStatus,
  getAppointmentsByType,
  getRequesterSchedulesByFixerDay,
  getAllRequesterSchedulesByFixerDay,
  getModalFormAppointment,
  getMeetingStatus
} from './read_controller.js';

const router = Router();

// Rutas para Locations
router.get('/locations/get_all', getAllLocations);
router.get('/locations/get_by_display_name', getLocationByDisplayName);
router.get('/locations/get_many_by_display_name', getManyLocationsByDisplayName);
router.get('/locations/get_by_place_id', getLocationByPlaceId);
router.get('/locations/get_many_by_place_id', getManyLocationsByPlaceId);
router.get('/locations/get_by_query_projection', getLocationsByQueryProjection);

// Rutas para Appointments - Básicas
router.get('/appointments/get_all', getAllAppointments);
router.post('/appointments/get_by_query_projection', getAppointmentByQueryProjection);

// Rutas para Appointments - Por ID
router.get('/appointments/get_by_id', getAppointmentById);
router.get('/appointments/get_many_by_ids', getManyAppointmentsByIds);

// Rutas para Appointments - Por Fixer
router.get('/appointments/get_by_fixer_id', getAppointmentsByFixerId);
router.get('/appointments/get_by_fixer_and_date', getAppointmentsByFixerAndDate);

// Rutas para Appointments - Por Requester
router.get('/appointments/get_by_requester_id', getAppointmentsByRequesterId);
router.get('/appointments/get_by_requester_and_date', getAppointmentsByRequesterAndDate);

// Rutas para Appointments - Por otros criterios
router.get('/appointments/get_by_date_range', getAppointmentsByDateRange);
router.get('/appointments/get_by_status', getAppointmentsByStatus);
router.get('/appointments/get_by_type', getAppointmentsByType);

// Rutas para Schedules - Por mes
router.get('/schedules/get_by_fixer_current_requester_month', getRequesterSchedulesByFixerMonth);
router.get('/schedules/get_by_fixer_other_requesters_month', getAllRequesterSchedulesByFixerMonth);

// Rutas para Schedules - Por día
router.get('/schedules/get_by_fixer_current_requester_day', getRequesterSchedulesByFixerDay);
router.get('/schedules/get_by_fixer_other_requesters_day', getAllRequesterSchedulesByFixerDay);

// Ruta para Modal Form
router.get('/appointments/get_modal_form', getModalFormAppointment);

router.get('/appointments/get_meeting_status', getMeetingStatus);

export default router;