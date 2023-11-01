import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createPostController } from "../../../useCases/post/createPost";
import { getRecentPostsController } from "../../../useCases/post/getRecentPosts";
import { getPostBySlugController } from "../../../useCases/post/getPostBySlug";
import { getPopularPostsController } from "../../../useCases/post/getPopularPosts";
import { getLessVotedController } from "../../../useCases/post/getLessVoted";
import { upvotePostController } from "../../../useCases/post/upvotePost";
import { downvotePostController } from "../../../useCases/post/downvotePost";


/**
 * Router for handling post-related HTTP routes.
 */
const postRouter = express.Router();

/**
 * Route for creating a post.
 */

postRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  createPostController.execute(req, res),
);

/**
 * Route for getting posts.
 */
postRouter.get(
  "/recent",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getRecentPostsController.execute(req, res),
);

/**
 * Route for getting less voted posts.
 */
postRouter.get(
  "/less-voted",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getLessVotedController.execute(req, res),
);

/**
 * Route for getting popular posts.
 */
postRouter.get(
  "/popular",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPopularPostsController.execute(req, res),
);

/**
 * Route for getting a post by its slug.
 */
postRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  getPostBySlugController.execute(req, res),
);

/**
 * Route for upvoting a post.
 */
postRouter.post("/upvote", middleware.ensureAuthenticated(), (req, res) =>
  upvotePostController.execute(req, res),
);

/**
 * Route for downvoting a post.
 */
postRouter.post("/downvote", middleware.ensureAuthenticated(), (req, res) =>
  downvotePostController.execute(req, res),
);

export { postRouter };
