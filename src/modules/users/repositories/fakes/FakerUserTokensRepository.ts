import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { uuid } from 'uuidv4';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakerUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid(), token: uuid(), user_id });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakerUserTokensRepository;
