import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointementService';

describe('CreateAppointement', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointment.execute(
      { 
        date: new Date,
        provider_id: '123123'
      }
    )

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 4, 1)

    await createAppointment.execute(
      { 
        date: appointmentDate,
        provider_id: '123123'
      }
    )

    expect(createAppointment.execute(
      { 
        date: appointmentDate,
        provider_id: '123123'
      }
    )).rejects.toBeInstanceOf(AppError);
  })
})