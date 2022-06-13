import { getRepository } from 'typeorm';

import { Posts } from '../../src/entities/Posts';

const PostFactory = async (): Promise<Posts> => {
    const post: Partial<Posts> = {
        name: 'test post',
        info: 'This is test post',
        price: 100
    };
    return await getRepository(Posts).save(post);
};

export default PostFactory;
