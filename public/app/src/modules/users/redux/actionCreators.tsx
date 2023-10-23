import * as actions from "./actions";
import { Post } from "../../../modules/forum/models/Post";
import { Comment } from "../../../modules/forum/models/Comment";
import { isReturnStatement } from "typescript";

/**
 * Represents a ForumAction, a type that can have various keys, each with a corresponding action type or any data.
 */
export type ForumAction = { [key: string]: actions.ForumActionType | any };

/**
 * Action creator user for creating a user.
 *@returns The action object with the type `CREATING_USER`.
  */
export function creatingUser(): ForumAction {
  return {
    type: actions.CREATING_USER
  };
}

/**
 * Action creator for creating a user success.
 * @returns The action object with the type `CREATING_USER_SUCCESS`.
 */
export function creatingUserSuccess(): ForumAction {
  return {
    type: actions.CREATING_USER_SUCCESS
  };
}

/**
 * Action creator for creating a user failure.
 * @param error - The error message.
 * @returns The action object with the type `CREATING_USER_FAILURE` and the error message.
 */

export function creatingUserFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_USER_FAILURE,
    error
  };
}

/** Action creator for getting a user profile.
 * @returns The action object with the type `GETTING_USER_PROFILE`.
 * */
export function gettingUserProfile(): ForumAction {
  return {
    type: actions.GETTING_USER_PROFILE
  };
}

/**
 * Action creator for getting a user profile success.
 * @param user - The User object.
 * @returns The action object with the type `GETTING_USER_PROFILE_SUCCESS` and the user data.
 */

export function gettingUserProfileSuccess(user: any): ForumAction {
  return {
    type: actions.GETTING_USER_PROFILE_SUCCESS,
    user
  };
}

/**
 * Action creator for getting a user profile failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_USER_PROFILE_FAILURE` and the error message.
 */

export function gettingUserProfileFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_USER_PROFILE_FAILURE,
    error
  };
}

/**
 * Action creator for submitting a post.
 * @returns The action object with the type `SUBMITTING_POST`.
 */
export function submittingPost(): ForumAction {
  return {
    type: actions.SUBMITTING_POST
  };
}

/**
 * Action creator for submitting a post success.
 * @returns The action object with the type `SUBMITTING_POST_SUCCESS`.
 */
export function submittingPostSuccess(): ForumAction {
  return {
    type: actions.SUBMITTING_POST_SUCCESS
  };
}

/**
 * Action creator for submitting a post failure.
 * @param error - The error message.
 * @returns The action object with the type `SUBMITTING_POST_FAILURE` and the error message.
 */
export function submittingPostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.SUBMITTING_POST_FAILURE,
    error
  };
}

/**
 * Action creator for getting recent posts.
 * @returns The action object with the type `GETTING_RECENT_POSTS`.
 */
export function getRecentPosts(): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

/**
 * Action creator for getting recent posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_RECENT_POSTS_SUCCESS` and the posts data.
 */
export function getRecentPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS_SUCCESS,
    posts
  };
}

/**
 * Action creator for getting recent posts failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_RECENT_POSTS_FAILURE` and the error message.
 */
export function getRecentPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting a post by its slug.
 * @returns The action object with the type `GETTING_POST_BY_SLUG`.
 */
export function gettingPostBySlug(): ForumAction {
  return {
    type: actions.GETTING_POST_BY_SLUG
  };
}

/**
 * Action creator for getting a post by its slug success.
 * @param post - The Post object.
 * @returns The action object with the type `GETTING_POST_BY_SLUG_SUCCESS` and the post data.
 */
export function gettingPostBySlugSuccess(post: Post): ForumAction & { post: Post } {
  return {
    type: actions.GETTING_POST_BY_SLUG_SUCCESS,
    post
  };
}

/**
 * Action creator for getting a post by its slug failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_POST_BY_SLUG_FAILURE` and the error message.
 */
export function gettingPostBySlugFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POST_BY_SLUG_FAILURE,
    error
  };
}

/**
 * Action creator for creating a reply to a post.
 * @returns The action object with the type `CREATING_REPLY_TO_POST`.
 */
export function creatingReplyToPost(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST
  };
}

/**
 * Action creator for creating a reply to a post success.
 * @returns The action object with the type `CREATING_REPLY_TO_POST_SUCCESS`.
 */
export function creatingReplyToPostSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_SUCCESS
  };
}

/**
 * Action creator for creating a reply to a post failure.
 * @param error - The error message.
 * @returns The action object with the type `CREATING_REPLY_TO_POST_FAILURE` and the error message.
 */
export function creatingReplyToPostFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_FAILURE,
    error
  };
}

/**
 * Action creator for getting comments.
 * @returns The action object with the type `GETTING_COMMENTS`.
 */
export function gettingComments(): ForumAction {
  return {
    type: actions.GETTING_COMMENTS
  };
}

/**
 * Action creator for getting comments success.
 * @param comments - An array of Comment objects.
 * @returns The action object with the type `GETTING_COMMENTS_SUCCESS` and the comments data.
 */
export function gettingCommentsSuccess(comments: Comment[]): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_SUCCESS,
    comments
  };
}

/**
 * Action creator for getting comments failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_COMMENTS_FAILURE` and the error message.
 */
export function gettingCommentsFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting popular posts.
 * @returns The action object with the type `GETTING_POPULAR_POSTS`.
 */
export function getPopularPosts(): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS
  };
}

/**
 * Action creator for getting popular posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_POPULAR_POSTS_SUCCESS` and the posts data.
 */
export function getPopularPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS_SUCCESS,
    posts
  };
}

/**
 * Action creator for getting popular posts failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_POPULAR_POSTS_FAILURE` and the error message.
 */
export function getPopularPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POPULAR_POSTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting less voted posts.
 * @returns The action object with the type `GETTING_LESS_VOTED`.
 */
export function getLessVoted(): ForumAction {
  return {
    type: actions.GETTING_LESS_VOTED
  };
}

/**
 * Action creator for getting less voted posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_LESS_VOTED_SUCCESS` and the posts data.
 */
export function getLessVotedSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_LESS_VOTED_SUCCESS,
    posts
  };
}

/**
 * Action creator for getting less voted posts failure.
 * @param error - The error message.
 * @returns The action object with the type `GETTING_LESS_VOTED_FAILURE` and the error message.
 */
export function getLessVotedFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_LESS_VOTED_FAILURE,
    error
  };
}

/**
 * Action creator for creating a reply to a comment.
 * @returns The action object with the type `CREATING_REPLY_TO_COMMENT`.
 */
export function creatingReplyToComment(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT
  };
}

/**
 * Action creator for creating a reply to a comment success.
 * @returns The action object with the type `CREATING_REPLY_TO_COMMENT_SUCCESS`.
 */
export function creatingReplyToCommentSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_SUCCESS
  };
}

/**
 * Action creator for creating a reply to a comment failure.
 * @param error - The error message.
 * @returns The action object with the type `CREATING_REPLY_TO_COMMENT_FAILURE` and the error message.
 */
export function creatingReplyToCommentFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_FAILURE,
    error
  };
}

/**
 * Action creator for upvoting a post.
 * @returns The action object with the type `UPVOTING_POST`.
 */
export function upvotingPost(): ForumAction {
  return {
    type: actions.UPVOTING_POST
  };
}

/**
 * Action creator for upvoting a post success.
 * @returns The action object with the type `UPVOTING_POST_SUCCESS`.
 */
export function upvotingPostSuccess(): ForumAction {
  return {
    type: actions.UPVOTING_POST_SUCCESS
  };
}

/**
 * Action creator for upvoting a post failure.
 * @param error - The error message.
 * @returns The action object with the type `UPVOTING_POST_FAILURE` and the error message.
 */
export function upvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_POST_FAILURE,
    error
  };
}

/**
 * Action creator for downvoting a post.
 * @returns The action object with the type `DOWNVOTING_POST`.
 */
export function downvotingPost(): ForumAction {
  return {
    type: actions.DOWNVOTING_POST
  };
}

/**
 * Action creator for downvoting a post success.
 * @returns The action object with the type `DOWNVOTING_POST_SUCCESS`.
 */
export function downvotingPostSuccess(): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_SUCCESS
  };
}

/**
 * Action creator for downvoting a post failure.
 * @param error - The error message.
 * @returns The action object with the type `DOWNVOTING_POST_FAILURE` and the error message.
 */
export function downvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_FAILURE,
    error
  };
}

/**
 * Action creator for upvoting a comment.
 * @returns The action object with the type `UPVOTING_COMMENT`.
 */
export function upvotingComment(): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT
  };
}

/**
 * Action creator for upvoting a comment success.
 * @returns The action object with the type `UPVOTING_COMMENT_SUCCESS`.
 */
export function upvotingCommentSuccess(): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_SUCCESS
  };
}

/**
 * Action creator for upvoting a comment failure.
 * @param error - The error message.
 * @returns The action object with the type `UPVOTING_COMMENT_FAILURE` and the error message.
 */
export function upvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_FAILURE,
    error
  };
}

/**
 * Action creator for downvoting a comment.
 * @returns The action object with the type `DOWNVOTING_COMMENT`.
 */
export function downvotingComment(): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT
  };
}

/**
 * Action creator for downvoting a comment success.
 * @returns The action object with the type `DOWNVOTING_COMMENT_SUCCESS`.
 */
export function downvotingCommentSuccess(): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_SUCCESS
  };
}

/**
 * Action creator for downvoting a comment failure.
 * @param error - The error message.
 * @returns The action object with the type `DOWNVOTING_COMMENT_FAILURE` and the error message.
 */
export function downvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_FAILURE,
    error
  };
}

