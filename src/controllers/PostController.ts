import { Request, Response, NextFunction } from 'express';

import PostService from '../services/PostService';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { list, totalCount } = await this.postService.getPosts();

      res.json({
        list,
        totalCount
      });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.createPost(req.body);

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const posts = await this.postService.getPostById(+id);

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.postService.updatePost(+id, req.body);
      res.status(200).json();
    } catch  (err) {
      next(err);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.postService.removePost(+id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}

export const postController = new PostController();
