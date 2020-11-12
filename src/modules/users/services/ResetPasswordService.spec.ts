import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    
    resetPassword = new ResetPasswordService(
      fakeUsersRepository, 
      fakeUserTokensRepository
    );
  })

  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({ password: 'johndoe@gmail.com', token });

    user = await fakeUsersRepository.findById(user.id);

    expect(user.password).toBe('12345');
  });
})