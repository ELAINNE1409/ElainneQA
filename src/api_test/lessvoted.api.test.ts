/**
 * API TESTS FOR LESS VOTED ENDPOINT
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Posts from "./endpoints/Posts";
import Users from "./endpoints/Users";



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
let slug: string;

/**
 * Test Suite for Less Voted Endpoint
 */
describe("Less Voted Endpoint Test Suite", () => {
  beforeAll(async () => {
    posts = new Posts();
    users = new Users();
    
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

});

  // Testes para criação de posts, obtenção de posts populares, obtenção de posts recentes, obtenção de less voted,
  // obtenção de slug de um post, upvote e downvote de um post

  