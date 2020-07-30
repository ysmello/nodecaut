import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRespository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointementService';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRespository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
