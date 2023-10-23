import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { PostType, Post } from '../../../modules/forum/models/Post';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { IAuthService } from '../../users/services/authService';
import { Result } from '../../../shared/core/Result';
import { right, left } from '../../../shared/core/Either';
import { PostUtil } from '../../../modules/forum/utils/PostUtil';
import { PostDTO } from '../../../modules/forum/dtos/postDTO';

/**
 * Interface that defines the methods for interacting with post-related services.
 */
export interface IPostService {
  /**
   * Get recent posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an APIResponse containing an array of Post objects.
   */
  getRecentPosts(offset?: number): Promise<APIResponse<Post[]>>;

  /**
   * Get popular posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an APIResponse containing an array of Post objects.
   */
  getPopularPosts(offset?: number): Promise<APIResponse<Post[]>>;

  /**
   * Get less-voted posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an APIResponse containing an array of Post objects.
   */
  getLessVoted(offset?: number): Promise<APIResponse<Post[]>>;

  /**
   * Get a post by its slug.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse containing a Post object.
   */
  getPostBySlug(slug: string): Promise<APIResponse<Post>>;

  /**
   * Upvote a post.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse indicating the result of the operation.
   */
  upvotePost(slug: string): Promise<APIResponse<void>>;

  /**
   * Downvote a post.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse indicating the result of the operation.
   */
  downvotePost(slug: string): Promise<APIResponse<void>>;
}

/**
 * Implementation of the IPostService interface for interacting with post-related services.
 */
export class PostService extends BaseAPI implements IPostService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  /**
   * Get a post by its slug.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse containing a Post object.
   */
  public async getPostBySlug(slug: string): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts',
        { slug },
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post>(PostUtil.toViewModel(response.data.post)));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  /**
   * Get recent posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an APIResponse containing an array of Post objects.
   */
  public async getRecentPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts/recent',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  /**
   * Get popular posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an APIResponse containing an array of Post objects.
   */
  public async getPopularPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.get(
        '/posts/popular',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  /**
 * Get less-voted posts.
 *
 * @param offset - Optional offset for pagination.
 * @returns A promise of an APIResponse containing an array of Post objects.
 */
  public async getLessVoted(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.get(
        '/posts/less-voted',
        { offset },
        isAuthenticated ? auth : null
      );
  
      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
  
  /**
   * Create a new post.
   *
   * @param title - The title of the post.
   * @param type - The type of the post.
   * @param text - Optional text content of the post.
   * @param link - Optional link associated with the post.
   * @returns A promise of an APIResponse indicating the result of the operation.
   */ 
  public async createPost(
    title: string,
    type: PostType,
    text?: string,
    link?: string   ): Promise<APIResponse<void>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.post(
        '/posts',
        { title, type, text, link },
        isAuthenticated ? auth : null
      );
  
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
  /**
   * Upvote a post.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse indicating the result of the operation.
   */
  public async upvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.post(
        '/posts/upvote',
        { slug },
        isAuthenticated ? auth : null
      );

      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
  /**
   * Downvote a post.
   *
   * @param slug - The slug of the post.
   * @returns A promise of an APIResponse indicating the result of the operation.
   */
  public async downvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.post(
        '/posts/downvote',
        { slug },
        isAuthenticated ? auth : null
      );

      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
}