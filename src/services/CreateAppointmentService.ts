import Appoitment from '../models/Appointement';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns'

interface RequestDTO {
  date : Date;
  provider : string;
}

class CreateAppointmentService {

  private appointmentsRepository : AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({date, provider} : RequestDTO) : Appoitment{

    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate){
      throw Error('this appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      date: appoitmentDate,
      provider,
    });

    return appointment;
  }

}

export default CreateAppointmentService;
