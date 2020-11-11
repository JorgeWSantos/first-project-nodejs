import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const allAppointments = appointmentsRepository.all();

  return res.status(200).json(allAppointments);
});

appointmentsRouter.post('/', (req, res) => {

  try {

    const { provider, date } = req.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({ date: parsedDate, provider });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

});

export default appointmentsRouter;
