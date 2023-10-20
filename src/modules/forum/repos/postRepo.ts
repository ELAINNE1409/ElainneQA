import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostDetails } from "../domain/postDetails";

/**
 * Repository interface for interacting with post-related data.
 */
export interface IPostRepo {
  /**
   * Get post details by its slug.
   *
   * @param slug - The slug of the post.
   * @returns A promise of PostDetails.
   */
  getPostDetailsBySlug(slug: string): Promise<PostDetails>;

  /**
   * Get a post by its slug.
   *
   * @param slug - The slug of the post.
   * @returns A promise of Post.
   */
  getPostBySlug(slug: string): Promise<Post>;

  /**
   * Get recent posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an array of PostDetails.
   */
  getRecentPosts(offset?: number): Promise<PostDetails[]>;

  /**
   * Get popular posts.
   *
   * @param offset - Optional offset for pagination.
   * @returns A promise of an array of PostDetails.
   */
  getPopularPosts(offset?: number): Promise<PostDetails[]>;

  /**
   * Get the number of comments for a post by its ID.
   *
   * @param postId - The ID of the post.
   * @returns A promise of the number of comments.
   */
  getNumberOfCommentsByPostId(postId: PostId | string): Promise<number>;

  /**
   * Get a post by its ID.
   *
   * @param postId - The ID of the post.
   * @returns A promise of Post.
   */
  getPostByPostId(postId: PostId | string): Promise<Post>;

  /**
   * Check if a post with the given ID exists.
   *
   * @param postId - The ID of the post.
   * @returns A promise indicating whether the post exists.
   */
  exists(postId: PostId): Promise<boolean>;

  /**
   * Save a post.
   *
   * @param post - The post to be saved.
   * @returns A promise indicating the success of the operation.
   */
  save(post: Post): Promise<void>;

  /**
   * Delete a post by its ID.
   *
   * @param postId - The ID of the post to be deleted.
   * @returns A promise indicating the success of the operation.
   */
  delete(postId: PostId): Promise<void>;

  /**
   * Get less-voted posts.
   *
   * @returns A promise of an array of Post.
   */
  getLessVoted(): Promise<Post[]>;

  // Other methods...
}
