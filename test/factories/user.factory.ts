import faker from 'faker';
import { getRepository } from 'typeorm';
import crypto from 'crypto';

import { Users } from '../../src/entities/Users';
import { UserRole } from '../../src/shared/constants/global.constants';

const UserFactory = async (args = {}): Promise<Users> => {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update('password').digest('base64');

    const user: Partial<Users> = {
        email: faker.internet.email(),
        password: salt + '$' + hash,
        role: UserRole.ADMIN,
    };
    return await getRepository(Users).save(user);
};

export default UserFactory;
