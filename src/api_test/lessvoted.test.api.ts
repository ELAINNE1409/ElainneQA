/**
 * API TESTS FOR LESS VOTED ENDPOINT
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comment from "./endpoints/Comments";
import Constants from "./config/postsConstants";
import { PostSlug } from "../modules/forum/domain/postSlug";
import e from "express";

// Configuração do logger e módulos
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
let message: string;

/**
 * Test Suite for Less Voted Endpoint
 */
describe("Less Voted Endpoint Test Suite", () => {
  beforeAll(async () => {
    posts = new Posts();
    users = new Users();
    comments = new Comment();
  });

  // Testes para criação de usuário, login e obtenção de token de acesso

  /**
   * Creates a user.
   */
  it("Create User", async () => {
    const response = await users.post("Cristina", "elainne@gmail.com", "cristina");
    expect(response.status).toBe(200);
  });

  /**
   * Post Login.
   */
  it("Post Login", async () => {
    const response = await users.postLogin("Cristina", "cristina");
    expect(response.status).toBe(200);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  /**
   * Get Me.
   */
  it("Get Me", async () => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("Cristina");
  });

  // Testes para criação de posts, obtenção de posts populares, obtenção de posts recentes, obtenção de less voted,
  // obtenção de slug de um post, upvote e downvote de um post

  /**
   * Creates a post.
   */
  it("Creates a post", async () => {
    const response = await posts.createPost(
      accessToken,
      "US001 Less Voted Post",
      "text",
      "US01 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Get less voted posts(no access token)", async () => {
    const response = await posts.getLessVoted(null, "token");

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

  t("Check if posts are sorted by lesser points first", async () => {
    const response = await posts.getLessVoted(accessToken);

    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();

    const postsArray = response.data.posts;
    for (let i = 0; i < postsArray.length - 1; i++) {
      const currentPost = postsArray[i];
      const nextPost = postsArray[i + 1];
      const currentPoints = new Date(currentPost.points);
      const nextPoints = new Date(nextPost.points);

      expect(currentPoints <= nextPoints).toBe(true);
    }
  });
});



