
/**
 * Represents the available action types in the forum.
 */
export type ForumActionType = 
  | 'SUBMITTING_POST'
  | 'SUBMITTING_POST_SUCCESS'
  | 'SUBMITTING_POST_FAILURE'
  
  | 'GETTING_RECENT_POSTS'
  | 'GETTING_RECENT_POSTS_SUCCESS'
  | 'GETTING_RECENT_POSTS_FAILURE'
  
  | 'GETTING_POST_BY_SLUG'
  | 'GETTING_POST_BY_SLUG_SUCCESS'
  | 'GETTING_POST_BY_SLUG_FAILURE'
  
  | 'CREATING_REPLY_TO_POST'
  | 'CREATING_REPLY_TO_POST_SUCCESS'
  | 'CREATING_REPLY_TO_POST_FAILURE'
  
  | 'GETTING_COMMENTS'
  | 'GETTING_COMMENTS_SUCCESS' 
  | 'GETTING_COMMENTS_FAILURE'
  
  | 'GETTING_POPULAR_POSTS'
  | 'GETTING_POPULAR_POSTS_SUCCESS' 
  | 'GETTING_POPULAR_POSTS_FAILURE'
  
  | 'GETTING_LESS_VOTED'
  | 'GETTING_LESS_VOTED_SUCCESS' 
  | 'GETTING_LESS_VOTED_FAILURE'
  
  | 'GETTING_COMMENT_BY_COMMENT_ID'
  | 'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS'
  | 'GETTING_COMMENT_BY_COMMENT_ID_FAILURE'
  
  | 'CREATING_REPLY_TO_COMMENT'
  | 'CREATING_REPLY_TO_COMMENT_SUCCESS'
  | 'CREATING_REPLY_TO_COMMENT_FAILURE'
  
  | 'UPVOTING_POST'
  | 'UPVOTING_POST_SUCCESS'
  | 'UPVOTING_POST_FAILURE'
  
  | 'DOWNVOTING_POST'
  | 'DOWNVOTING_POST_SUCCESS'
  | 'DOWNVOTING_POST_FAILURE'
  
  | 'UPVOTING_COMMENT'
  | 'UPVOTING_COMMENT_SUCCESS'
  | 'UPVOTING_COMMENT_FAILURE'
  
  | 'DOWNVOTING_COMMENT'
  | 'DOWNVOTING_COMMENT_SUCCESS'
  | 'DOWNVOTING_COMMENT_FAILURE';

/**
 * Action type for submitting a post.
 */
const SUBMITTING_POST: ForumActionType = 'SUBMITTING_POST';

/**
 * Action type for submitting a post success.
 */
const SUBMITTING_POST_SUCCESS: ForumActionType = 'SUBMITTING_POST_SUCCESS';

/**
 * Action type for submitting a post failure.
 */
const SUBMITTING_POST_FAILURE: ForumActionType = 'SUBMITTING_POST_FAILURE';

/**
 * Action type for getting recent posts.
 */
const GETTING_RECENT_POSTS: ForumActionType = 'GETTING_RECENT_POSTS';

/**
 * Action type for getting recent posts success.
 */
const GETTING_RECENT_POSTS_SUCCESS: ForumActionType = 'GETTING_RECENT_POSTS_SUCCESS';

/**
 * Action type for getting recent posts failure.
 */
const GETTING_RECENT_POSTS_FAILURE: ForumActionType = 'GETTING_RECENT_POSTS_FAILURE';

/**
 * Action type for getting a post by its slug.
 */
const GETTING_POST_BY_SLUG: ForumActionType = 'GETTING_POST_BY_SLUG';

/**
 * Action type for getting a post by its slug success.
 */
const GETTING_POST_BY_SLUG_SUCCESS: ForumActionType = 'GETTING_POST_BY_SLUG_SUCCESS';

/**
 * Action type for getting a post by its slug failure.
 */
const GETTING_POST_BY_SLUG_FAILURE: ForumActionType = 'GETTING_POST_BY_SLUG_FAILURE';

/**
 * Action type for creating a reply to a post.
 */
const CREATING_REPLY_TO_POST: ForumActionType = 'CREATING_REPLY_TO_POST';

/**
 * Action type for creating a reply to a post success.
 */
const CREATING_REPLY_TO_POST_SUCCESS: ForumActionType = 'CREATING_REPLY_TO_POST_SUCCESS';

/**
 * Action type for creating a reply to a post failure.
 */
const CREATING_REPLY_TO_POST_FAILURE: ForumActionType = 'CREATING_REPLY_TO_POST_FAILURE';

/**
 * Action type for getting comments.
 */
const GETTING_COMMENTS: ForumActionType = 'GETTING_COMMENTS';

/**
 * Action type for getting comments success.
 */
const GETTING_COMMENTS_SUCCESS: ForumActionType = 'GETTING_COMMENTS_SUCCESS';

/**
 * Action type for getting comments failure.
 */
const GETTING_COMMENTS_FAILURE: ForumActionType = 'GETTING_COMMENTS_FAILURE';

/**
 * Action type for getting popular posts.
 */
const GETTING_POPULAR_POSTS: ForumActionType = 'GETTING_POPULAR_POSTS';

/**
 * Action type for getting popular posts success.
 */
const GETTING_POPULAR_POSTS_SUCCESS: ForumActionType = 'GETTING_POPULAR_POSTS_SUCCESS';

/**
 * Action type for getting popular posts failure.
 */
const GETTING_POPULAR_POSTS_FAILURE: ForumActionType = 'GETTING_POPULAR_POSTS_FAILURE';

/**
 * Action type for getting less voted posts.
 */
const GETTING_LESS_VOTED: ForumActionType = 'GETTING_LESS_VOTED';

/**
 * Action type for getting less voted posts success.
 */
const GETTING_LESS_VOTED_SUCCESS: ForumActionType = 'GETTING_LESS_VOTED_SUCCESS';

/**
 * Action type for getting less voted posts failure.
 */
const GETTING_LESS_VOTED_FAILURE: ForumActionType = 'GETTING_LESS_VOTED_FAILURE';

/**
 * Action type for getting a comment by its comment ID.
 */
const GETTING_COMMENT_BY_COMMENT_ID: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID';

/**
 * Action type for getting a comment by its comment ID success.
 */
const GETTING_COMMENT_BY_COMMENT_ID_SUCCESS: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS';

/**
 * Action type for getting a comment by its comment ID failure.
 */
const GETTING_COMMENT_BY_COMMENT_ID_FAILURE: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID_FAILURE';

/**
 * Action type for creating a reply to a comment.
 */
const CREATING_REPLY_TO_COMMENT: ForumActionType = 'CREATING_REPLY_TO_COMMENT';

/**
 * Action type for creating a reply to a comment success.
 */
const CREATING_REPLY_TO_COMMENT_SUCCESS: ForumActionType = 'CREATING_REPLY_TO_COMMENT_SUCCESS';

/**
 * Action type for creating a reply to a comment*/
