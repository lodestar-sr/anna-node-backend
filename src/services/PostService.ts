import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { Posts } from '../entities/Posts';

@Service()
export default class PostService {
  public async createPost(createPostData: Partial<Posts>): Promise<Posts> {
    return getRepository(Posts).save(createPostData);
  }

  public async getPosts(): Promise<{list: Posts[], totalCount: number}> {
    const postRepository = getRepository(Posts);

    const list = await postRepository.find();
    const totalCount = await postRepository.count();
    return { list, totalCount };
  }

  public async getPostById(id: number): Promise<Posts> {
    return getRepository(Posts).findOne(id);
  }

  public async updatePost(id: number, updatePostData: Posts): Promise<any> {
    return getRepository(Posts).update(id, updatePostData);
  }

  public async removePost(id: number): Promise<any> {
    return getRepository(Posts).delete(id);
  }
}
