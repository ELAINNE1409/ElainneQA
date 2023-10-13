import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import { AxiosResponse } from "axios";
import { formatText } from "./config/formatText";

import Constants from "./config/postsConstants";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import { access } from "fs";
import { get } from "lodash";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

//Sleep function
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Get post slug from list of recent posts by post title
function getPostSlug(response, postTitle: string): string {
  for (let post of response.data.posts) {
    if (post.title == postTitle) {
      return post.slug;
    }
  }
}

let posts: Posts;
let users: Users;

let accessToken: string; //user1
let refreshToken: string; //user1
let accessToken2: string; //user2
let refreshToken2: string; //user2

let postSlug: string;

/**
 * @related US004 - Vote on a post
 * @description These test suites are responsible for testing the positive and the negative scenarios of the upvote and the downvote on a post.
 */

describe("US004 - Vote on a post flow tests - positive scenarios", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());

    //Create user1 and user2
    await users.post(Constants.USERNAME, Constants.EMAIL, Constants.PASSWORD);
    await users.post(
      Constants.USERNAME2,
      Constants.EMAIL2,
      Constants.PASSWORD2
    );

    //Login with user1 and retrive access token
    const response = await users.postLogin(
      Constants.USERNAME,
      Constants.PASSWORD
    );
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  describe("User upvotes a post - for the first time and twice on the same post - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User1 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT,
        ""
      );

      //Login with user2 and retrive access token
      const response = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken2 = response.data.accessToken;
      refreshToken2 = response.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken2);

      postSlug = getPostSlug(response, Constants.TITLE);
      //postSlug1 = response.data.posts[0].slug;

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);

      log.debug("postSlug: " + postSlug);
    });

    it("Checks upvote success", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - incrementa 2 em vez de 1
    it("Checks the +1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(1);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - não está a registar o voto realizado previamente (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            //await sleep(150);
            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(true);

            log.debug("postSlug: " + postSlug);

        });*/

    //não passa - considera que deveria dar satus 200 em vez de 409 (no postman também dá status 200)
    it("Checks upvote failure when the user tries to vote on a post previously upvoted by him", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken2, postSlug);

      //let message: string;
      //log.debug("Message: " + message);
      expect(response.status).toBe(409);
      //expect(response.data.message).toBeDefined();
      //expect(response.data.message).toContain("This post was already upvoted postId {${postId}}, memberId {${memberId}}.");

      log.debug("postSlug: " + postSlug);
    });

    //não passa - resultado mantém-se inalterado, contudo como a contagem do primeiro voto falha, este teste também falha (deveria manter pontos = 1, mas dá pontos = 2)
    it("Checks that the post points do not change after upvoting for the second time on a previously upvoted post", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(1);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - não está a registar o voto realizado (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            //await sleep(150);
            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(true);

            log.debug("postSlug: " + postSlug);

        });*/
  });

  describe("3rd user votes on a post already upvoted by only one user - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //Create user3
      await users.post(
        Constants.USERNAME3,
        Constants.EMAIL3,
        Constants.PASSWORD3
      );

      //Login with user3 and retrives access token
      const response = await users.postLogin(
        Constants.USERNAME3,
        Constants.PASSWORD3
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken);
      postSlug = getPostSlug(response, Constants.TITLE);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - considera 2 pontos em vez de 1 (porque após o primeiro voto a contagem final deu 2 pontos em vez de 1)
    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(1);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);

      log.debug("postSlug: " + postSlug);
    });

    it("Checks upvote success", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - incrementa 1 mas como os pontos após o primeiro voto estão errados, o resultado final também está errado (dá 3 em vez de 2)
    it("Checks the +1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(2);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(true);

            log.debug("postSlug: " + postSlug);

        });*/
  });

  describe("User downvotes a post - for the first time and twice on the same post - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User1 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE2,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT2,
        ""
      );

      //Login with user2 and retrive access token
      const response = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken2 = response.data.accessToken;
      refreshToken2 = response.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken2);

      postSlug = getPostSlug(response, Constants.TITLE2);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("slug: " + postSlug);
    });

    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);
      expect(response.data.post.wasDownvotedByMe).toBeDefined();
      expect(response.data.post.wasDownvotedByMe).toBe(false);

      log.debug("slug: " + postSlug);
    });

    it("Checks downvote success", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - não incrementa -1, resultado mantém-se inalterado
    it("Checks the -1 decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-1);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/

    //não passa - considera que deveria dar status 200 em vez de 409
    it("Checks downvote failure when the user tries to vote on a post previously upvoted by him", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken2, postSlug);

      expect(response.status).toBe(409);
    });

    //não passa - pq contagem inicial mal (considera que contagem seria 0, pq após 1ºvoto contagem deu 0)
    it("Checks that the post points do not change after downvoting for the second time on a previously downvoted post", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-1);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/
  });

  describe("3rd user votes on a post already downvoted by only one user - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //Create user4
      await users.post(
        Constants.USERNAME4,
        Constants.EMAIL4,
        Constants.PASSWORD4
      );

      //Login with user4 and retrives access token
      const response = await users.postLogin(
        Constants.USERNAME4,
        Constants.PASSWORD4
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken);
      postSlug = getPostSlug(response, Constants.TITLE2);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - considera 0 pontos em vez de -1 (porque após o primeiro voto a contagem final deu 0 pontos em vez de -1)
    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-1);
      expect(response.data.post.wasDownvotedByMe).toBeDefined();
      expect(response.data.post.wasDownvotedByMe).toBe(false);

      log.debug("slug: " + postSlug);
    });

    it("Checks downvote success", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - incrementa -1 mas como os pontos após o primeiro voto estão errados, o resultado final também está errado (considera que deveria dar -1 em vez de -2)
    it("Checks the -1 decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-2);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/
  });

  describe("User changes upvote to downvote - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User1 logs in
      const response = await users.postLogin(
        Constants.USERNAME,
        Constants.PASSWORD
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      //User1 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE3,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT3,
        ""
      );

      //Login with user2 and retrive access token
      const response2 = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken2 = response2.data.accessToken;
      refreshToken2 = response2.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken2);
      postSlug = getPostSlug(response, Constants.TITLE3);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    //não passa - considera que post acabado de criar tem 1 ponto em vez de 0
    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);

      log.debug("slug: " + postSlug);
    });

    it("Checks upvote success", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - mesma situação da contagem do primeiro voto (considera que deveria dar 2 em vez de 1 nos pontos)
    it("Checks the +1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(1);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto (recebe false em vez de true)
    /*it("Checks if the database registered the vote by the user", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/

    it("Checks downvote success when the user tries to downvote the post previously upvoted by him", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - decorrente da contagem errada do primeiro voto (considerada que deveria dar 1 em vez de 0 - decrementação OK, mas resultado final errado por nº de pontos inicial errado)
    it("Checks the -1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

    });*/

    it("Checks downvote success when the user tries to revert to downvote", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    it("Checks the -1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-1);

      log.debug("slug: " + postSlug);
    });
  });

  describe("User changes downvote to upvote - user is NOT the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User1 logs in
      const response = await users.postLogin(
        Constants.USERNAME,
        Constants.PASSWORD
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      //User1 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE4,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT4,
        ""
      );

      //Login with user2 and retrive access token
      const response2 = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken2 = response2.data.accessToken;
      refreshToken2 = response2.data.refreshToken;
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken2);
      postSlug = getPostSlug(response, Constants.TITLE4);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);

      log.debug("slug: " + postSlug);
    });

    it("Checks downvote success", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - mesma situação da contagem do primeiro voto (neste teste considerado que pontos deveria dar 0 em vez de -1 - mas incrementação OK)
    it("Checks the -1 decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(-1);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/

    it("Checks upvote success when the user tries to upvote the post previously downvoted by him", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    //não passa - decorrente da contagem errada do primeiro voto (considera que deveria dar 1 em vez de 0 - mas incrementação OK)
    it("Checks the +1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);

      log.debug("slug: " + postSlug);
    });

    it("Checks upvote success when the user tries to revert to upvote", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken2, postSlug);

      expect(response.status).toBe(200);
    });

    it("Checks the +1 increment on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken2);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(1);

      log.debug("slug: " + postSlug);
    });

    //não passa - não está a registar o voto na base de dados (recebe false em vez de true)
    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(true);

            log.debug("slug: " + postSlug);

        });*/
  });
});

describe("US004 - Vote on a post flow tests - negative scenarios", (): void => {
  /*beforeAll(async (): Promise<void> => {
        posts = new Posts();
        users = new Users();
    
        log.debug("1. Posts Base url: " + posts.getBaseUrl());
    });

    describe("User upvotes a post when not logged in", (): void => {

        it("Checks upvote failure", async (): Promise<void> => {
        
        });

    });

    describe("User downvotes a post when not logged in", (): void => {

        it("Checks downvote failure", async (): Promise<void> => {
        
        });

    });

    describe("User upvotes a post with an expired access token", (): void => {
    
    });

    describe("User downvotes a post with an expired access token", (): void => {
    
    });

    describe("User upvotes a post with an empty access token", (): void => {
    
    });

    describe("User downvotes a post with an empty access token", (): void => {
    
    });

    describe("User upvotes a post with an empty slug", (): void => {
    
    });

    describe("User downvotes a post with an empty slug", (): void => {
    
    });

    describe("User upvotes a post with an unexistent slug", (): void => {
    
    });

    describe("User downvotes a post with an unexistent slug", (): void => {
    
    });

    describe("User upvotes a post with an empty body request (no slug)", (): void => {
    
    });

    describe("User downvotes a post with an empty body request (no slug)", (): void => {
    
    });
*/

  describe("User upvotes a post - for the first time and twice on the same post - user IS the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User2 logs in
      const response = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      //User2 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE5,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT5,
        ""
      );
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken);
      postSlug = getPostSlug(response, Constants.TITLE5);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);
    });

    //não passa - considera que deveria dar status 200 (contudo, depois não há alteração nos pontos)
    it("Checks upvote insuccess", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });

    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(false);

        });*/

    //não passa - considera que deveria dar status 200
    it("Checks upvote second try insuccess", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });

    /*
        it("Checks upvote failure when the user tries to vote on his own post for the second time", async (): Promise<void> => {

            const response = await posts.upvotePost(accessToken, postSlug1);

            expect(response.status).toBe(409);

        });

        it("Checks that the post points do not change after upvoting for the second time on a previously upvoted post", async (): Promise<void> => {

            await sleep(250);
            const response = await posts.getPostBySlug(postSlug1, accessToken);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug1);
            expect(response.data.post.points).toBeDefined();
            expect(response.data.post.points).toBe(0);

        });

        it("Checks if the database does not save the registration of a second vote", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug1, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug1);
            expect(response.data.post.wasUpvotedByMe).toBeDefined();
            expect(response.data.post.wasUpvotedByMe).toBe(false);

        });
        */
  });

  describe("User downvotes a post - for the first time and twice on the same post - user IS the post owner", (): void => {
    beforeAll(async (): Promise<void> => {
      //User2 logs in
      const response = await users.postLogin(
        Constants.USERNAME2,
        Constants.PASSWORD2
      );
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      //User2 creates a post
      await posts.createPost(
        accessToken,
        Constants.TITLE6,
        Constants.POSTTYPE1,
        Constants.POSTCONTENT6,
        ""
      );
    });

    it("Gets post slug", async (): Promise<void> => {
      const response = await posts.getRecentPosts(null, accessToken);
      postSlug = getPostSlug(response, Constants.TITLE6);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);

      log.debug("postSlug: " + postSlug);
    });

    it("Gets the post by its slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);
    });

    //não passa - considera que deveria dar status 200 (contudo, depois não há alteração nos pontos)
    it("Checks downvote insuccess", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });

    /*it("Checks if the vote by the user was registered", async (): Promise<void> => {

            const response = await posts.getPostBySlug(postSlug, accessToken2);

            expect(response.status).toBe(200);
            expect(response.data.post.slug).toBe(postSlug);
            expect(response.data.post.wasDownvotedByMe).toBeDefined();
            expect(response.data.post.wasDownvotedByMe).toBe(false);

        });*/

    //não passa - considera que deveria dar status 200
    it("Checks downvote insuccess", async (): Promise<void> => {
      const response = await posts.downvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    //não passa - considera que deveria dar -1 pontos (decrementa mais uma vez, ou seja, deixa fazer downvote 2x)
    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });

    //não passa - considera que deveria dar status 200
    it("Checks upvote insuccess", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });

    //não passa - considera que deveria dar status 200
    it("Checks upvote insuccess", async (): Promise<void> => {
      const response = await posts.upvotePost(accessToken, postSlug);

      expect(response.status).toBe(403);

      log.debug("access token: " + accessToken);
    });

    //não passa - considera que deveria dar 1 pontos (incrementa uma vez, pq considerava que não tinha votos de upvote prévios)
    it("Checks the no increment/decrement on the post points", async (): Promise<void> => {
      await sleep(150);
      const response = await posts.getPostBySlug(postSlug, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);
    });
  });
});

//falta: posts do tipo link
