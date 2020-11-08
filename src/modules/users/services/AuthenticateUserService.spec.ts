import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('CreateAppointement', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute(
      { 
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123123"
      }
    );

    const response = await authenticateUser.execute({
      email: "johndoe@gmail.com",
      password: "123123",
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});