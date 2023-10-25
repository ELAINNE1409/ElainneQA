
/**
 * API TESTS FOR LESS VOTED ENDPOINT
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comment from "./endpoints/Comments";
import { AxiosResponse } from "axios";
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
let comments: Comment;

let accessToken: string;
let refreshToken: string;
let slug: string;
let comentId: string;
let postId: string;

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
  it("Create User", async (): Promise<void> => {
    const response = await users.post("Cristina", "elainne@gmail.com", "cristina");
    expect(response.status).toBe(200);
  });

  /**
   * Post Login.
   */
  it("Post Login", async (): Promise<void> => {
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
  it("Get Me", async (): Promise<void> => {
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
  it("Creates a post", async (): Promise<void> => {
    const response = await posts.createPost(
      accessToken,
      "US001 Less Voted Post",
      "text",
      "US01 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  /**
   * Get popular posts.
   */
  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);
  });

  /**
   * Get recent posts.
   */
  it("Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);
  });

  /**
   * Get less voted.
   */
  /*it("Get less voted", async (): Promise<any> => {
    const response = await posts.getLessVoted();
    expect(response.status).toBe(200);
  });/*

  /**
   * Get slug posts.
   */
  it("Get slug posts", async (): Promise<any> => {
    // Suponha que você tenha um ID de post válido para obter o slug.
    const postId = "seu-id-de-post";
    const response = await posts.getPostBySlug(postId);
    expect(response.status).toBe(200);

  });



  /**
   * Upvote a post.
   */
  it("Upvote a post", async (): Promise<void> => {
    // Suponha que você tenha um ID de post válido para votar.
    const postId = "seu-id-de-post";
    const response = await posts.upvotePost(postId, accessToken);
    expect(response.status).toBe(200);
    
  });

  /**
   * Downvote a post.
   */
  it("Downvote a post", async (): Promise<void> => {
    // Suponha que você tenha um ID de post válido para votar.
    const postId = "seu-id-de-post";
    const response = await posts.downvotePost(postId, accessToken);
    expect(response.status).toBe(200);
    
  });
});
