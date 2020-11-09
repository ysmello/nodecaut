import AppError from '@shared/errors/AppError';

import FakeEmailProvider from '@shared/Container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeEmailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    await fakeUsersRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345'
    })

    await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });
})