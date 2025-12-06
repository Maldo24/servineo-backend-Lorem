/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
// import { connectDatabase } from './config/db.config';

import jobOfertRoutes from './api/routes/jobOfert.routes';
import newoffersRoutes from './api/routes/newOffers.routes';
import fixerRoutes from './api/routes/fixer.routes';
import jobsRoutes from './api/routes/jobs.routes';

import CreateRoutes from './api/routes/create_appointment.routes';
import ReadRoutes from './api/routes/read_appointment.routes';
import UpdateRoutes from './api/routes/update_appointment.routes';
import LocationRoutes from './api/routes/location.routes';
import GetScheduleRoutes from './api/routes/get_schedule.routes';
import searchRoutes from './api/routes/search.routes';
import chartRoutes from './api/routes/chart.routes';

import trackingRoutes from './api/routes/tracking-appointments.routes';
import experienceRoutes from './routes/experience.routes';
import userProfileRoutes from './routes/userProfile.routes';
import userRoutes from './routes/user.routes';
import jobOfficial from './routes/job_offer.routes';

import registrarDatosRouter from '../src/api/routes/userManagement/registrarDatos.routes';
import fotoPerfilRouter from '../src/api/routes/userManagement/fotoPerfil.routes';
import googleRouter from '../src/api/routes/userManagement/google.routes';
import ubicacionRouter from '../src/api/routes/userManagement/ubicacion.routes';

import certificationRoutes from './routes/certification.routes';
import authRouter from './api/routes/userManagement/login.routes';
import modificarDatosRouter from './api/routes/userManagement/modificarDatos.routes';
import nominatimRouter from './api/routes/userManagement/sugerencias.routes';
import deviceRouter from './api/routes/userManagement/device.routes';
import cambiarContrasenaRouter from './api/routes/userManagement/editarContraseña.routes';
import cerrarSesionesRouter from './api/routes/userManagement/cerrarSesiones.routes';
import ultimoCambioRouter from './api/routes/userManagement/ultimoCambio.routes';
import githubAuthRouter from './api/routes/userManagement/github.routes';
import discordRoutes from './api/routes/userManagement/discord.routes';
import clienteRouter from './api/routes/userManagement/cliente.routes';
import obtenerContrasenaRouter from './api/routes/userManagement/obtener.routes';
import adminRouter from './api/routes/userManagement/admin.routes';
import portfolioRoutes from './routes/portfolio.routes';
import routerUser from './api/routes/user.routes';
// import Search from './models/search.model';

import activityRoutes from './api/routes/activities.routes';
import CardsRoutes from './api/routes/card.routes';
import PaymentRoutes from './api/routes/payment.routes';
import CashPayRoutes from './api/routes/cashpay.routes';
import BankAccountRoutes from './api/routes/BankAccount.routes';
import paymentsRouter from './api/routes/paymentsQR.routes';
import PaymentCenterRoutes from './api/routes/paymentCenter.routes';
import myJobsPaymentRoutes from './api/routes/jobsPayment.routes';
import invoiceDetailRouter from './api/routes/invoice.routes';
import bankTransferRoutes from './api/routes/bankTransfer.routes';
import rechargeWallet from './api/routes/wallet.routes';
import { FEATURE_DEV_WALLET, FEATURE_SIM_PAYMENTS } from './models/featureFlags.model';
import { devWalletRouter } from './api/routes/dev-wallet.routes';
import { simPaymentsRouter } from './api/routes/sim-payments.routes';
import SudoersRouter from './modules/sudoers.routes';
import sesion2faRouter from './api/routes/userManagement/sesion2fa.routes';
import ingresar2faRouter from './api/routes/userManagement/ingresar2fa.routes';
import codigos2faRouter from './api/routes/userManagement/codigos2fa.routes';
import twoFaRouter from './api/routes/userManagement/2fa.routes';
import deleteAccountRoutes from './api/routes/userManagement/deleteAccount.routes';
import updateProfileRouter from './api/routes/userManagement/updateProfile.routes';
//nuevas rutas signup
import signUpRoutes from './api/routes/userManagement/signUp.routes';
//rutas notificaciones
import notificationRoutes from './modules/notifications/notification.routes';
import forumRoutes from './api/routes/forum.routes';
import faqRoutes from './api/routes/faq.routes';
import captchaRoutes from './api/routes/captcha.routes';

import editProfileRoutes from './api/routes/userManagement/editProfile.routes';

const app = express();

const allowedOrigins = [
  'https://servineo-frontend-bytes-bandidos.vercel.app',
  'https://devmasters-servineo-frontend-zk3q.vercel.app',
  'https://servineo.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/editProfile', editProfileRoutes);
app.use('/api/fixer/payment-center', PaymentCenterRoutes);
app.use('/api/signUp', signUpRoutes);
app.use('/api', searchRoutes);
app.use('/api/devmaster', jobOfertRoutes);
app.use('/api/newOffers', newoffersRoutes);
app.use('/api/fixers', fixerRoutes);
app.use('/api', activityRoutes);
app.use('/api', jobsRoutes);
app.use('/api/admin', trackingRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/login', authRouter);

app.use('/api/user-profiles', userProfileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/controlC/modificar-datos', modificarDatosRouter);
app.use('/api/controlC/sugerencias', nominatimRouter);
app.use('/api/controlC/cambiar-contrasena', cambiarContrasenaRouter);
app.use('/api/controlC/cerrar-sesiones', cerrarSesionesRouter);
app.use('/api/controlC/ultimo-cambio', ultimoCambioRouter);
app.use('/api/controlC/obtener-password', obtenerContrasenaRouter);
app.use('/api/controlC/usuario/update', updateProfileRouter);
app.use('/api/controlC/usuario', deleteAccountRoutes);
app.use('/auth', githubAuthRouter);
app.use('/auth', discordRoutes);
app.use('/api/controlC/cliente', clienteRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin/chart', chartRoutes);
app.use('/api/user', routerUser);
//ruta oficial para ofertas de trabajo no borrar
app.use('/api/job-offers', jobOfficial);
app.use('/api/certifications', certificationRoutes);
app.use('/api/signUp', signUpRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/location', LocationRoutes);
app.use('/api/crud_create', CreateRoutes);
app.use('/api/crud_read', ReadRoutes);
app.use('/api/crud_update', UpdateRoutes);
app.use('/api/crud_read', GetScheduleRoutes);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerRoutes = (app: any) => {
  app.use('/devices', deviceRouter);
};
// --- TUS RUTAS (Añadidas) ---
app.use('/api', CardsRoutes);
app.use('/api', PaymentRoutes);
app.use('/api', BankAccountRoutes);
app.use('/api/lab', CashPayRoutes);
app.use('/api', rechargeWallet);
app.use('/api', myJobsPaymentRoutes);
app.use('/api/transferencia-bancaria', bankTransferRoutes);
app.use('/api/v1/invoices', invoiceDetailRouter);
app.use('/api/fixer/payment-center', PaymentCenterRoutes);
app.use('/payments', paymentsRouter);
app.use('/', SudoersRouter);

console.log('FEATURE_DEV_WALLET =', FEATURE_DEV_WALLET);
if (FEATURE_DEV_WALLET) {
  console.log('MOUNT /api/dev ✅');
  app.use('/api/dev', devWalletRouter);
}
if (FEATURE_SIM_PAYMENTS) {
  app.use('/api/sim', simPaymentsRouter);
}
app.use('/devices', deviceRouter);

app.use('/api', forumRoutes);
app.use('/api', faqRoutes);
app.use('/', captchaRoutes);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default app;
