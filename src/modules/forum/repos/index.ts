
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";
import { PostRepo } from "./implementations/sequelizePostRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { PostVotesRepo } from "./implementations/sequelizePostVotesRepo";
import { CommentVotesRepo } from "./implementations/sequelizeCommentVotesRepo";

/**
 * Repository for managing comment votes.
 */
const commentVotesRepo = new CommentVotesRepo(models);

/**
 * Repository for managing post votes.
 */
const postVotesRepo = new PostVotesRepo(models);

/**
 * Repository for managing members.
 */
const memberRepo = new MemberRepo(models);

/**
 * Repository for managing comments.
 */
const commentRepo = new CommentRepo(models, commentVotesRepo);

/**
 * Repository for managing posts.
 */
const postRepo = new PostRepo(models, commentRepo, postVotesRepo);

export {
  commentVotesRepo,
  postVotesRepo,
  memberRepo,
  commentRepo,
  postRepo,
};