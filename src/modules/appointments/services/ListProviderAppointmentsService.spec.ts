import FakeAppoitmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppoitmentsRepository: FakeAppoitmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppoitmentsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppoitmentsRepository,
    );
  });

  it('should be able to list the appointments on a specif day', async () => {
    const appointment1 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute(
      {
        provider_id: 'provider',
        day: 20,
        year: 2020,
        month: 5,
      },
    );

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
