import { Router } from 'express';
import {
  getMapLocations,
  getTrackingMetrics,
  getFixerStats,
  getAppointmentTypesCount,
  getFixerStatsByName,
} from '../controllers/tracking-appointments.controller';

const router = Router();
router.get('/map-locations', getMapLocations);
router.get('/metrics', getTrackingMetrics);
router.get('/fixer-stats', getFixerStats);
router.get('/types-count', getAppointmentTypesCount);
router.get('/fixer-stats-by-name', getFixerStatsByName);
export default router;
