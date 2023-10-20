
import * as actions from "./actions";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";

/**
 * Represents a ForumAction, a type that can have various keys, each with a corresponding action type or any data.
 */
export type ForumAction = { [key: string]: actions.ForumActionType | any };

/**
 * Action creator for submitting a post.
 * @returns The action object with the type `SUBMITTING_POST`.
 */
function submittingPost(): ForumAction {
  return {
    type: actions.SUBMITTING_POST
  };
}

/**
 * Action creator for submitting a post success.
 * @returns The action object with the type `SUBMITTING_POST_SUCCESS`.
 */
function submittingPostSuccess(): ForumAction {
  return {
    type: actions.SUBMITTING_POST_SUCCESS
  };
}

/**
 * Action creator for submitting a post failure.
 * @param error - The error message.
 * @returns The action object with the type `SUBMITTING_POST_FAILURE` and the error message.
 */
function submittingPostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.SUBMITTING_POST_FAILURE,
    error
  };
}

/**
 * Action creator for getting recent posts.
 * @returns The action object with the type `GETTING_RECENT_POSTS`.
 */
function getRecentPosts(): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

/**
 * Action creator for getting recent posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_RECENT_POSTS_SUCCESS` and the posts data.
 */
function getRecentPostsSuccess(posts: Post[]): ForumAction {
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
function getRecentPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting a post by its slug.
 * @returns The action object with the type `GETTING_POST_BY_SLUG`.
 */
function gettingPostBySlug(): ForumAction {
  return {
    type: actions.GETTING_POST_BY_SLUG
  };
}

/**
 * Action creator for getting a post by its slug success.
 * @param post - The Post object.
 * @returns The action object with the type `GETTING_POST_BY_SLUG_SUCCESS` and the post data.
 */
function gettingPostBySlugSuccess(post: Post): ForumAction & { post: Post } {
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
function gettingPostBySlugFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POST_BY_SLUG_FAILURE,
    error
  };
}

/**
 * Action creator for creating a reply to a post.
 * @returns The action object with the type `CREATING_REPLY_TO_POST`.
 */
function creatingReplyToPost(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST
  };
}

/**
 * Action creator for creating a reply to a post success.
 * @returns The action object with the type `CREATING_REPLY_TO_POST_SUCCESS`.
 */
function creatingReplyToPostSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_SUCCESS
  };
}

/**
 * Action creator for creating a reply to a post failure.
 * @param error - The error message.
 * @returns The action object with the type `CREATING_REPLY_TO_POST_FAILURE` and the error message.
 */
function creatingReplyToPostFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_FAILURE,
    error
  };
}

/**
 * Action creator for getting comments.
 * @returns The action object with the type `GETTING_COMMENTS`.
 */
function gettingComments(): ForumAction {
  return {
    type: actions.GETTING_COMMENTS
  };
}

/**
 * Action creator for getting comments success.
 * @param comments - An array of Comment objects.
 * @returns The action object with the type `GETTING_COMMENTS_SUCCESS` and the comments data.
 */
function gettingCommentsSuccess(comments: Comment[]): ForumAction {
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
function gettingCommentsFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting popular posts.
 * @returns The action object with the type `GETTING_POPULAR_POSTS`.
 */
function getPopularPosts(): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS
  };
}

/**
 * Action creator for getting popular posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_POPULAR_POSTS_SUCCESS` and the posts data.
 */
function getPopularPostsSuccess(posts: Post[]): ForumAction {
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
function getPopularPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POPULAR_POSTS_FAILURE,
    error
  };
}

/**
 * Action creator for getting less voted posts.
 * @returns The action object with the type `GETTING_LESS_VOTED`.
 */
function getLessVoted(): ForumAction {
  return {
    type: actions.GETTING_LESS_VOTED
  };
}

/**
 * Action creator for getting less voted posts success.
 * @param posts - An array of Post objects.
 * @returns The action object with the type `GETTING_LESS_VOTED_SUCCESS` and the posts data.
 */
function getLessVotedSuccess(posts: Post[]): ForumAction {
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
function getLessVotedFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_LESS_VOTED_FAILURE,
    error
  };
}

/**
 * Action creator for getting a comment by its comment ID.
 * @returns The action object with the type `GETTING_COMMENT_BY_ID`.
