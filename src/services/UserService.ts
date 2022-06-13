import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { Users } from '../entities/Users';
import { UserRole } from '../shared/constants/global.constants';

@Service()
export default class UserService {
  public async createUser(createUserData: Partial<Users>): Promise<Users> {
    const userRepository = getRepository(Users);
    const count = await userRepository.count();
    if (count === 0) {
      createUserData.role = UserRole.ADMIN;
    }

    return await userRepository.save(createUserData);
  }

  public async findByEmail(email: string): Promise<Users> {
    return await getRepository(Users).findOne({
      where: { email: email },
    });
  }
}
