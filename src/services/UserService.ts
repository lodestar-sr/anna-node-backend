import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { Users } from '../entities/Users';

@Service()
export default class UserService {
  public async createUser(createUserData: Partial<Users>): Promise<Users> {
    const userRepository = getRepository(Users);

    return await userRepository.save(createUserData);
  }

  public async findByEmail(email: string): Promise<Users> {
    return await getRepository(Users).findOne({
      where: { email: email },
    });
  }

  public async getUsers(): Promise<{ users: Users[], totalCount: number }> {
    const userRepository = getRepository(Users);

    const users = await userRepository.find();
    const totalCount = await userRepository.count();

    return { users, totalCount };
  }

  public async updateUser(id: number, updateUserData: Users): Promise<any> {
    const userRepository = getRepository(Users);

    return userRepository.update(id, updateUserData);
  }

  public async removeUser(id: number): Promise<any> {
    const userRepository = getRepository(Users);

    return userRepository.delete(id);
  }
}
