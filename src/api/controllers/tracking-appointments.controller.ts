import { Request, Response } from 'express';

import Appointment from '../../models/appointment.model';
import { User } from '../../models/user.model';
export const getFixerStatsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Falta el parámetro ?name=' });
    }

    // 1. Buscar usuario
    const user = await User.findOne({
      name: { $regex: name as string, $options: 'i' },
      role: 'fixer',
    });

    if (!user) {
      return res.status(404).json({ error: `No se encontró al fixer: ${name}` });
    }

    const fixerIdString = user._id.toString();

    // 2. Calcular stats
    const stats = await Appointment.aggregate([
      {
        $match: { id_fixer: fixerIdString },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$schedule_state', 'booked'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$schedule_state', 'cancelled'] }, 1, 0] } },
          rescheduled: {
            $sum: {
              $cond: [
                {
                  $and: [{ $ne: ['$reprogram_reason', ''] }, { $ne: ['$reprogram_reason', null] }],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const data = stats[0] || { total: 0, active: 0, cancelled: 0, rescheduled: 0 };

    const rate = data.total > 0 ? ((data.cancelled / data.total) * 100).toFixed(1) : '0.0';

    // 3. Devolver JSON exacto
    res.json({
      fixerId: fixerIdString,
      fixerName: user.name,
      stats: {
        total_citas: data.total,
        activas: data.active,
        canceladas: data.cancelled,
        reprogramadas: data.rescheduled,
        tasa_cancelacion: `${rate}%`,
      },
    });
  } catch (error) {
    console.error('Error en getFixerStatsByName:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export const getAppointmentTypesCount = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    let matchStage: any = {};

    // Opcional: Si quieres filtrar por fechas también aquí
    if (startDate || endDate) {
      matchStage.starting_time = {};
      if (startDate) matchStage.starting_time.$gte = new Date(startDate as string);
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59);
        matchStage.starting_time.$lte = end;
      }
    }

    const counts = await Appointment.aggregate([
      { $match: matchStage }, // Filtro de fechas (si se envían)
      {
        $group: {
          _id: '$appointment_type', // Agrupa por 'virtual' o 'presential'
          count: { $sum: 1 }, // Cuentalos
        },
      },
    ]);

    // Formateamos la respuesta para que sea muy fácil de usar en el Frontend
    const result = {
      virtual: counts.find((c) => c._id === 'virtual')?.count || 0,
      presential: counts.find((c) => c._id === 'presential')?.count || 0,
      total: counts.reduce((acc, curr) => acc + curr.count, 0),
    };

    res.json(result);
  } catch (error) {
    console.error('Error en getAppointmentTypesCount:', error);
    res.status(500).json({ error: 'Error contando tipos de citas' });
  }
};

export const getMapLocations = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({
      lat: { $nin: [null, ''] },
      lon: { $nin: [null, ''] },
    }).lean();

    let userMap: Record<string, string> = {};

    try {
      if (appointments.length > 0) {
        const fixerIds = [...new Set(appointments.map((app: any) => app.id_fixer))];

        const validIds = fixerIds.filter((id) => id && typeof id === 'string');

        if (validIds.length > 0) {
          const users = await User.find({ _id: { $in: validIds } }).select('_id name');
          users.forEach((user: any) => {
            userMap[user._id.toString()] = user.name;
          });
        }
      }
    } catch (error) {
      console.error(' Error cargando nombres de fixers:', error);
    }

    const mappedAppointments = appointments.map((appointment: any) => ({
      _id: appointment._id,
      lat: appointment.lat,
      lon: appointment.lon,
      status: appointment.schedule_state,

      fixerName: userMap[appointment.id_fixer] || 'Fixer Desconocido',
      requesterName: appointment.current_requester_name,
      date: appointment.starting_time,
    }));

    res.json(mappedAppointments);
  } catch (error) {
    console.error(' Error en getMapLocations:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTrackingMetrics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const matchStage: any = {};

    if (startDate || endDate) {
      matchStage.starting_time = {};
      if (startDate) matchStage.starting_time.$gte = new Date(startDate as string);
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59);
        matchStage.starting_time.$lte = end;
      }
    }

    const metrics = await Appointment.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$schedule_state', 'booked'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$schedule_state', 'cancelled'] }, 1, 0] } },
        },
      },
    ]);

    const result = metrics[0] || { total: 0, active: 0, cancelled: 0 };
    res.json(result);
  } catch (error) {
    console.error(' Error en getTrackingMetrics:', error);
    res.status(500).json({ error: 'Error calculando métricas' });
  }
};

export const getFixerStats = async (req: Request, res: Response) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: '$id_fixer',
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$schedule_state', 'booked'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$schedule_state', 'cancelled'] }, 1, 0] } },
          rescheduled: {
            $sum: {
              $cond: [
                {
                  $and: [{ $ne: ['$reprogram_reason', ''] }, { $ne: ['$reprogram_reason', null] }],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      // Ordenar por TOTAL de citas (Descendente: -1)
      { $sort: { total: -1 } },

      //Solo traer los primeros 10
      { $limit: 10 },
    ]);

    const fixerIds = stats.map((s) => s._id).filter((id) => id);

    // Solo buscamos nombres para estos 10, mucho más rápido
    const users = await User.find({ _id: { $in: fixerIds } }).select('_id name');

    const userMap: Record<string, string> = {};
    users.forEach((u) => {
      userMap[u._id.toString()] = u.name;
    });

    const finalStats = stats.map((stat) => {
      const name = userMap[stat._id] || 'Desconocido';
      const rate = stat.total > 0 ? ((stat.cancelled / stat.total) * 100).toFixed(1) : '0';

      return {
        id: stat._id,
        name,
        total: stat.total,
        active: stat.active,
        cancelled: stat.cancelled,
        rescheduled: stat.rescheduled,
        rate: `${rate}%`,
      };
    });

    res.json(finalStats);
  } catch (error) {
    console.error(' Error en getFixerStats:', error);
    res.status(500).json({ error: 'Error obteniendo estadísticas' });
  }
};
