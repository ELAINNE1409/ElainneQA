/**
 * API TESTS FOR SORT BY NEW ENDPOINT
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Posts from "./endpoints/Posts";
import CreatePost from "./endpoints/Posts";
import { PostSlug } from "../modules/forum/domain/postSlug";
import { PostDetails } from "../modules/forum/domain/postDetails";
import { access } from "fs";
import { get, initial } from "lodash";

import Users from "./endpoints/Users";
import { response } from "express";
import postLogin from "./endpoints/Users";
import { AxiosResponse } from "axios";
import { formatText } from "./config/formatText";

import Constants from "./config/postsConstants";
import { upvotePost } from "../modules/forum/useCases/post/upvotePost";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let users: Users;
let accessToken: string;
let refreshToken: string;

let postSlugs: string[] = [];
let postSlug: string;
let postSlug1: string;
let postSlug2: string;
let postSlug3: string;
let postSlug4: string;
let postSlug5: string;

let createdAt: string;
let message: string;
let status: number;
let wasUpvotedByMe1: boolean;

/**
 * Functional endpoint: Create a post
 *
 * Route: /api/v1/posts/
 */

describe("Sort endpoint  - Create a Post", (): void => {
  beforeAll(async (): Promise<void> => {
    //users = new Users();
    users = new Users();
    posts = new Posts();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  //0. Create user (to login and get access token)
  it("Create a new user", async (): Promise<void> => {
    const response = await users.post("sauron", "sauron@mordor.me", "sauron");
    expect(response.status).toBe(200);
  });
  //00. Login (to get access token to create a post)
  it("Login", async (): Promise<void> => {
    const response = await users.postLogin("sauron", "sauron");
    expect(response.status).toBe(200);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  //0. Get Popular Posts to get post slugs
  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();
    for (const post of response.data.posts) {
      expect(post.slug).toBeDefined();
    }
  });

  //1. Create post 1
  it("Create post 1", async (): Promise<void> => {
    const response = await posts.createPost(
      accessToken,
      "Post1",
      "text",
      "Post 1...............................",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create post 2", async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await posts.createPost(
      accessToken,
      "Post2",
      "text",
      "Post 2...............................",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create post 3", async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await posts.createPost(
      accessToken,
      "Post3",
      "text",
      "Post 3...............................",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create post 4", async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await posts.createPost(
      accessToken,
      "Post4",
      "text",
      "Post 4...............................",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Get recent posts as a visitor (no access token)", async (): Promise<void> => {
    const response = await posts.getRecentPosts(null, "");

    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();
    expect(response.data.posts.length).toBeGreaterThan(0);

    for (const post of response.data.posts) {
      expect(post.slug).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.createdAt).toBeDefined();
      expect(post.memberPostedBy).toBeDefined();
      expect(post.memberPostedBy.reputation).toBeDefined();
      expect(post.memberPostedBy.user).toBeDefined();
      expect(post.memberPostedBy.user.username).toBeDefined();
      expect(post.numComments).toBeDefined();
      expect(post.points).toBeDefined();
      expect(post.text).toBeDefined();
      expect(post.link).toBeDefined();
      expect(post.type).toBeDefined();
      expect(post.wasUpvotedByMe).toBeDefined();
      expect(post.wasDownvotedByMe).toBeDefined();
    }
    console.log(JSON.stringify(response.data));
  });
});

describe("Sort endpoint - Get Recent Posts", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  it("Get recent posts as a user (correct access token)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(null, accessToken);

    expect(response.status).toBe(200);
    expect(response.data.posts.length).toBeGreaterThan(0);
    expect(response.data.posts).toBeDefined();

    for (const post of response.data.posts) {
      expect(post.slug).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.createdAt).toBeDefined();
      expect(post.memberPostedBy).toBeDefined();
      expect(post.memberPostedBy.reputation).toBeDefined();
      expect(post.memberPostedBy.user).toBeDefined();
      expect(post.memberPostedBy.user.username).toBeDefined();
      expect(post.numComments).toBeDefined();
      expect(post.points).toBeDefined();
      expect(post.text).toBeDefined();
      expect(post.link).toBeDefined();
      expect(post.type).toBeDefined();
      expect(post.wasUpvotedByMe).toBeDefined();
      expect(post.wasDownvotedByMe).toBeDefined();
    }
    console.log(JSON.stringify(response.data));
  });

  it("Get recent posts as a user (no access token)", async (): Promise<void> => {
    const response = await posts.getRecentPosts(null, "");

    expect(response.status).toBe(200);
  });

  it("Get recent posts as a user (access token expired)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(null, Constants.EXPIREDTOKEN);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it("Get recent posts as a user (offset with value = 0)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(0);

    log.debug("Message: " + message);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("An unexpected error occurred.");
  });

  it("Get recent posts as a user (offset with value = 1)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(1);

    log.debug("Message: " + message);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("An unexpected error occurred.");
  });

  it("Check if posts are sorted by newest first", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(null, accessToken);

    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();

    const postsArray = response.data.posts;
    for (let i = 0; i < postsArray.length - 1; i++) {
      const currentPost = postsArray[i];
      const nextPost = postsArray[i + 1];
      const currentCreatedAt = new Date(currentPost.createdAt).getTime() / 1000;
      const nextCreatedAt = new Date(nextPost.createdAt).getTime() / 1000;

      expect(currentCreatedAt >= nextCreatedAt).toBe(true);
    }
  });
});
