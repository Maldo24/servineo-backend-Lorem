import { Router } from 'express';
import {registrarDispositivo, obtenerDispositivos, eliminarDispositivo, eliminarTodasExceptoActual} from '../../controllers/userManagement/device.controller';
import { verifyTOTPController } from '../../controllers/userManagement/ingresar2fa.controller';
import { checkTwoFactorStatusController } from '../../controllers/userManagement/sesion2fa.controller';
import { generate, verify, disable } from '../../controllers/userManagement/2fa.controller';
import { verifyJWT } from '../../controllers/userManagement/google.controller'; 
import { verifyRecoveryCode } from "../../controllers/userManagement/codigos2fa.controller";


const router = Router();

// Rutas dispositivo
router.post('/register', registrarDispositivo);
router.delete('/all/:userId', eliminarTodasExceptoActual);
router.delete('/:id', eliminarDispositivo);
router.get('/:userId', obtenerDispositivos);

//rutas poc
router.post('/generate', verifyJWT, generate);
router.post('/verify', verifyJWT, verify);
router.post('/disable', verifyJWT, disable);


router.post('/verify-totp', verifyTOTPController);


router.post('/check-status', checkTwoFactorStatusController);

router.post("/verify-recovery-code", verifyRecoveryCode);
export default router;