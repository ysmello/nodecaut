import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateAppointement', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    const appointment = await createAppointment.execute(
      { 
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123123"
      }
    )

    expect(appointment).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    const appointment = await createAppointment.execute(
      { 
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123123"
      }
    )

    expect(createAppointment.execute(
      { 
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123123"
      }
    )).rejects.toBeInstanceOf(AppError);
  });
})