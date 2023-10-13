/**
 * API TESTS FOR POSTS ENDPOINT
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
 * Functional endpoint: Get popular posts
 * 
 * Route: /api/v1/posts/popular
 */

describe("Posts endpoint - Get popular posts", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  it("Get popular posts as a visitor (no access token)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts(null, "");
    
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

describe("Posts endpoint - Get popular posts", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl()); //Log the base url for posts endpoint

    const response1 = await users.post(Constants.USERNAME, Constants.EMAIL, Constants.PASSWORD);//create a new user
    expect(response1.status).toBe(200);
    const response2 = await users.postLogin(Constants.USERNAME, Constants.PASSWORD);//login with the new user
    expect(response2.status).toBe(200);
    expect(response2.data.accessToken).toBeDefined();
    expect(response2.data.refreshToken).toBeDefined();
    accessToken = response2.data.accessToken;
    refreshToken = response2.data.refreshToken;
  });

  it("Get popular posts as a user (correct access token)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts(null, accessToken);

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

  it("Get popular posts as a user (no access token)", async (): Promise<void> => {
    const response = await posts.getPopularPosts(null, "");

    expect(response.status).toBe(200);
  });

  it("Get popular posts as a user (access token expired)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts(null, Constants.EXPIREDTOKEN);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it("Get popular posts as a user (offset with value = 0)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts(0);

    log.debug("Message: " + message);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("An unexpected error occurred.")
  });

  it("Get popular posts as a user (offset with value = 1)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts(1);

    log.debug("Message: " + message);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("An unexpected error occurred.")
  });
});


/**
 * Functional endpoint: Get recent posts
 * 
 * Route: /api/v1/posts/recent
 */

describe("Posts Endpoint - Get Recent Posts", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
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


describe("Posts Endpoint - Get Recent Posts", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());

    const response1 = await users.post(Constants.USERNAME3, Constants.EMAIL3, Constants.PASSWORD3);//create a new user
    expect(response1.status).toBe(200);
    const response2 = await users.postLogin(Constants.USERNAME3, Constants.PASSWORD3);//login with the new user
    expect(response2.status).toBe(200);
    expect(response2.data.accessToken).toBeDefined();
    expect(response2.data.refreshToken).toBeDefined();
    accessToken = response2.data.accessToken;
    refreshToken = response2.data.refreshToken;
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
    expect(response.data.message).toContain("An unexpected error occurred.")
  });

  it("Get recent posts as a user (offset with value = 1)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getRecentPosts(1);

    log.debug("Message: " + message);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("An unexpected error occurred.")
  });
});


/**
 * Functional endpoint: Create a post
 * 
 * Route: /api/v1/posts/
 */

describe("Posts Endpoint - Create a Post", (): void => {
  beforeAll(async (): Promise<void> => {
    //users = new Users();
    users = new Users();
    posts = new Posts();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  //test - visitor (no userId): can not create post
  it("Create a post as a visitor - can not create post", async (): Promise<void> => {
    const response = await posts.createPost("", "", "", "", "");
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("No access token provided");
  });

  //0. Create user (to login and get access token)
  it("Create a new user", async (): Promise<void> => {
    const response = await users.post("pedrito", "pedritocoelho@hotmail.com", "0123456789");
    expect(response.status).toBe(200);

  });
  //00. Login (to get access token to create a post)
  it("Login", async (): Promise<void> => {
    const response = await users.postLogin("pedrito", "0123456789");
    expect(response.status).toBe(200);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });
  ///000. Get Popular Posts to get post slugs
  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();
    for (const post of response.data.posts) {
      expect(post.slug).toBeDefined();
    }
  });


  describe("Posts Endpoint - Create a Post (Text Posts)", (): void => {

    //1. Create a text post - everything ok
    it("Create a text post - everything ok", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post1", "text", "A criar um post de texto: Olá Mundo! Tudo bem?.", "");
      expect(response.status).toBe(200);
    });

    //2. Create a text post - without title
    it("Create a text post without title", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "", "text", "A tentar criar um post de texto sem título.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //3. Create a text post - without text
    it("Create a text post without text", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post3", "text", "", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //4. Create a text post - without title and text  
    it("Create a text post without title and text ", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "", "text", "", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //5. Create a text post - without access token
    it("Create a text post without access token", async (): Promise<void> => {
      const response = await posts.createPost("", "Post5", "text", "A tentar criar posts para testar!!!!.", "");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("No access token provided");
    });

    //6. Create a text post - with invalid or expired access token
    it("Create a text post with invalid access token", async (): Promise<void> => {
      const response = await posts.createPost("invalid_access_token", "Post6", "text", "Este token está invalido, vai funcionar?.", "");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Token signature expired.");
    });

    //7. Create a text post - with invalid title (less than 2 characters)
    it("Create a text post with invalid title (less than 2 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "P", "text", "Este post tem um título inválido com menos de 2 caracters.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //8. Create a text post - with invalid title (more than 85 characters)
    it("Create a text post with invalid title (more than 85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam sequi nam veritatis, unde reprehenderit excepturi, vero eos cum eveniet atque facere obcaecati ipsa voluptates iusto! Unde aliquid facere esse quisquam ducimus voluptatem recusandae sed molestias excepturi, nesciunt repellendus voluptas numquam expedita quasi distinctio porro libero officiis.Voluptatem eligendi, nam quo blanditiis dignissimos quam natus.Repudiandae, eaque ex voluptatum sequi ipsam velit ipsa aut perspiciatis ducimus error provident eveniet, est praesentium a voluptatibus blanditiis ipsum debitis.Voluptatem dicta impedit rem omnis modi ex dolores error autem mollitia quas eaque totam, culpa ab placeat nobis expedita facilis alias accusantium ? Quod, neque eos.", "text", "Este post tem um título inválido com mais de 85 caracters.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //9. Create a text post - with invalid text (less than 13 characters (na mensagem diz 20: O programa está a contar o primeiro caracter como 8))
    it("Create a text post with invalid text (less than 20 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post9", "text", "E...", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //10. Create a text post - with invalid text (more than 10000 characters)
    it("Create a text post with invalid text (more than 10000 characters)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 100001; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10", "text", "x", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //11. Create a text post - with bold text formatting
    it("Create a text post with bold text formatting", async (): Promise<void> => {
      const formattedText = formatText("**bold**");
      const response = await posts.createPost(accessToken, "Post11", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //12. Create a text post - with italic text formatting
    it("Create a text post with italic text formatting", async (): Promise<void> => {
      const formattedText = formatText("*italic*");
      const response = await posts.createPost(accessToken, "Post12", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //13. Create a text post - with underline text formatting
    it("Create a text post with underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__underline__");
      const response = await posts.createPost(accessToken, "Post13", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //14. Create a text post - with hyperlink text formatting
    it("Create a text post with hyperlink text formatting", async (): Promise<void> => {
      const formattedText = formatText("[hyperlink](https://pt.wikipedia.org/wiki/Mam%C3%ADferos)");
      const response = await posts.createPost(accessToken, "Post14", "text", `Este texto tem um link: ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //15. Create a text post - with code text formatting
    it("Create a text post with code text formatting", async (): Promise<void> => {
      const formattedText = formatText("`Este texto está todo em code format`");
      const response = await posts.createPost(accessToken, "Post15", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //16. Create a text post - with bold+italic text formatting
    it("Create a text post with bold+italic text formatting", async (): Promise<void> => {
      const formattedText = formatText("***bold+italic***");
      const response = await posts.createPost(accessToken, "Post16", "text", `Este texto tem palavras em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //17. Create a text post - with bold+underline text formatting
    it("Create a text post  with bold+underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__**bold+underline**__");
      const response = await posts.createPost(accessToken, "Post17", "text", `Este texto tem palavras em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //18. Create a text post - with italic+underline text formatting
    it("Create a text post with italic+underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__*italic+underline*__");
      const response = await posts.createPost(accessToken, "Post18", "text", `Este texto tem palavras em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //19. Create a text post - with bold+italic+underline text formatting
    it("Create a text post with bold+italic+underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__***bold+italic+underline***__");
      const response = await posts.createPost(accessToken, "Post19", "text", `Este texto tem palavras em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //20. Create a text post - with bold+italic+underline+hyperlink text formatting
    it("Create a text post with bold, italic, underline and hyperlink text formatting", async (): Promise<void> => {
      const formattedTextbold = formatText("**bold**");
      const formattedTextitalic = formatText("*italic*");
      const formattedTextunderline = formatText("__underline__");
      const formattedTexthyperlink = formatText("[hyperlink](umlink)");
      const response = await posts.createPost(accessToken, "Post20", "text", `Este texto tem palavras em ${formattedTextbold}, ${formattedTextitalic}, ${formattedTextunderline} e ${formattedTexthyperlink}`, "");
      expect(response.status).toBe(200);
    });
  });

  describe("Posts endpoint - Create a Post (Link Posts)", (): void => {

    //21. Create a link post - everything ok
    it("Create a link post - everything ok", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post21", "link", "", "https://www.google.com");
      expect(response.status).toBe(200);

    });

    //22. Create a link post - without title
    it("Create a link post without title", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "", "link", "", "https://portal.isep.ipp.pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //23. Create a link post - without link
    it("Create a link post without link", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post23", "link", "", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //24. Create a link post - without title and link
    it("Create a link post without title and link", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "", "link", "", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //25. Create a link post - without access token
    it("Create a link post without access token", async (): Promise<void> => {
      const response = await posts.createPost("", "Post25", "link", "", "https://moodle.isep.ipp.pt/");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("No access token provided");
    });

    //26. Create a link post - with invalid or expired access token
    it("Create a link post with invalid access token", async (): Promise<void> => {
      const response = await posts.createPost("invalid_access_token", "Post26", "link", "", "https://portotechhub.com/switch/switch-qa/");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Token signature expired.");
    });

    //27. Create a link post - with invalid title (less than 2 characters)
    it("Create a link post with invalid title (less than 2 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "L", "link", "", "https://portotechhub.com/switch");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //28. Create a link post - with invalid title (more than 85 characters)
    it("Create a link post with invalid title (more than 85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam sequi nam veritatis, unde reprehenderit excepturi, vero eos cum eveniet atque facere obcaecati ipsa voluptates iusto! Unde aliquid facere esse quisquam ducimus voluptatem recusandae sed molestias excepturi, nesciunt repellendus voluptas numquam expedita quasi distinctio porro libero officiis.Voluptatem eligendi, nam quo blanditiis dignissimos quam natus.Repudiandae, eaque ex voluptatum sequi ipsam velit ipsa aut perspiciatis ducimus error provident eveniet, est praesentium a voluptatibus blanditiis ipsum debitis.Voluptatem dicta impedit rem omnis modi ex dolores error autem mollitia quas eaque totam, culpa ab placeat nobis expedita facilis alias accusantium ? Quod, neque eos.", "link", "", "https://portotechhub.com/");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29. Create a link post - with less than 8 characters
    it("Create a link post - link with less than 8 characters", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29", "link", "", "abc123");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //30. Create a link post - with more than 500 characters
    it("Create a link post - link with more than 500 characters", async (): Promise<void> => {
      const longLink = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890abc";
      const response = await posts.createPost(accessToken, "Post30", "link", "", longLink);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });
  });


  /**
   * Functional Endpoint: Get a Post by Slug
   * 
   * Route: /api/v1/posts/?slug
   */

  describe("Posts endpoint - Get a Post by Slug", (): void => {

    beforeAll(async () => {
      //Get popular posts and store all post slugs
      const response = await posts.getPopularPosts();
      expect(response.status).toBe(200);
      expect(response.data.posts).toBeDefined();
      expect(response.data.posts.length).toBeGreaterThan(0);

      for (const post of response.data.posts) {
        expect(post.slug).toBeDefined();
        postSlugs.push(post.slug);
      }
      postSlug = postSlugs[0];
      postSlug2 = postSlugs[1];
      postSlug3 = postSlugs[6];
      postSlug4 = postSlugs[8];
      postSlug5 = postSlugs[13];
      console.log("All post Slugs: " + postSlugs);
    });

    //31. Get a post by slug
    it("Get a post by its slug", async (): Promise<void> => {
      expect(postSlug).toBeDefined();
      expect(postSlug).not.toBeNull();
      expect(postSlug).not.toBe("");
      expect(postSlug).not.toBeUndefined();
      expect(postSlug).not.toBeNaN();

      console.log("postSlug: ", postSlug);

      const response = await posts.getPostBySlug(postSlug);
      expect(response.status).toBe(200);

      expect(response.data.post).toBeDefined();
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.title).toBeDefined();
      expect(response.data.post.createdAt).toBeDefined();
      expect(response.data.post.memberPostedBy).toBeDefined();
      expect(response.data.post.memberPostedBy.reputation).toBeDefined();
      expect(response.data.post.memberPostedBy.user).toBeDefined();
      expect(response.data.post.memberPostedBy.user.username).toBeDefined();
      expect(response.data.post.numComments).toBeDefined();
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.text).toBeDefined();
      expect(response.data.post.link).toBeDefined();
      expect(response.data.post.type).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasDownvotedByMe).toBeDefined();
    });

    //32. Get a post by slug - with empty slug
    it("Get a post by slug with an empty slug", async (): Promise<void> => {
      const emptySlug = "";
      const response = await posts.getPostBySlug(emptySlug);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Couldn't find a post by slug {}.");

    });

    //33. Get a post by slug - without slug
    it("Get a post by slug with no slug", async (): Promise<void> => {
      const response = await posts.getPostBySlug(undefined);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Couldn't find a post by slug {undefined}.");

    });

    //34. Get a post by slug - with invalid slug
    it("Get a post by slug with an invalid slug", async (): Promise<void> => {
      const invalidSlug = "invalid-slug";
      const response = await posts.getPostBySlug(invalidSlug);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toMatch(/Couldn't find a post by slug {.*slug}/);
      //expect(response.data.message).toContain("Couldn't find a post by slug {invalid slug}.");
      //expect(response.data.message).toContain("Couldn't find a post by slug {invalid-slug}.");
    });

    //35. Get a post by slug - multiple slugs
    it("Get posts by multiple slugs", async (): Promise<void> => {
      const slugs = [postSlug, postSlug2, postSlug3, postSlug4, postSlug5];
      for (const slug of slugs) {
        const response = await posts.getPostBySlug(slug);
        expect(response.status).toBe(200);
        expect(response.data.post).toBeDefined();
        expect(response.data.post.slug).toBe(slug);
        expect(response.data.post.title).toBeDefined();
        expect(response.data.post.createdAt).toBeDefined();
        expect(response.data.post.memberPostedBy).toBeDefined();
        expect(response.data.post.memberPostedBy.reputation).toBeDefined();
        expect(response.data.post.memberPostedBy.user).toBeDefined();
        expect(response.data.post.memberPostedBy.user.username).toBeDefined();
        expect(response.data.post.numComments).toBeDefined();
        expect(response.data.post.points).toBeDefined();
        expect(response.data.post.text).toBeDefined();
        expect(response.data.post.link).toBeDefined();
        expect(response.data.post.type).toBeDefined();
        expect(response.data.post.wasUpvotedByMe).toBeDefined();
        expect(response.data.post.wasDownvotedByMe).toBeDefined();
      }
    });

    //36. Get a post by slug - with valid access token
    it("Get a post by its slug with valid accessToken", async (): Promise<void> => {
      const response = await posts.getPostBySlug(postSlug, accessToken);
      expect(response.status).toBe(200);
      expect(response.data.post).toBeDefined();
      expect(response.data.post.slug).toBe(postSlug);
      expect(response.data.post.title).toBeDefined();
      expect(response.data.post.createdAt).toBeDefined();
      expect(response.data.post.memberPostedBy).toBeDefined();
      expect(response.data.post.memberPostedBy.reputation).toBeDefined();
      expect(response.data.post.memberPostedBy.user).toBeDefined();
      expect(response.data.post.memberPostedBy.user.username).toBeDefined();
      expect(response.data.post.numComments).toBeDefined();
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.text).toBeDefined();
      expect(response.data.post.link).toBeDefined();
      expect(response.data.post.type).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasDownvotedByMe).toBeDefined();
    });

    //37. Get a post by slug - with invalid access token
    it("Get a post with invalid accessToken", async (): Promise<void> => {
      const invalidAccessToken = "invalid-access-token";
      const response = await posts.getPostBySlug(postSlug, invalidAccessToken);
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Token signature expired.");
    });
  });
});


/**
 * Functional Endpoints: Upvote a Post, Downvote a Post
 * 
 * Routes: /api/v1/posts/upvote and /api/v1/posts/downvote
 */

describe("Posts Endpoint - Upvote a Post, Downvote a post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl()); //Log the base url for post endpoint
  });

  it("Upvote a post, when not logged in", async (): Promise<void> => {
    const response = await posts.upvotePost("[object Object]", Constants.POSTSLUG);

    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
    //console.log("Message: " + response.data.message);
  });

  it("Downvote a post, when not logged in", async (): Promise<void> => {
    const response = await posts.downvotePost("[object Object]", Constants.POSTSLUG);

    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
    //console.log("Message: " + response.data.message);
  });
});


describe("Posts Endpoint - Upvote a Post, Downvote a Post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl()); //Log the base url for posts endpoint

    const response1 = await users.post(Constants.USERNAME2, Constants.EMAIL2, Constants.PASSWORD2);//create a new user
    expect(response1.status).toBe(200);
    const response2 = await users.postLogin(Constants.USERNAME2, Constants.PASSWORD2);//login with the new user
    expect(response2.status).toBe(200);
    expect(response2.data.accessToken).toBeDefined();
    expect(response2.data.refreshToken).toBeDefined();
    accessToken = response2.data.accessToken;
    refreshToken = response2.data.refreshToken;
  });

  //Flow for upvoting a post for the first time and then for the second time
  it("Get popular posts", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts();

    postSlug1 = response.data.posts[0].slug;//get the slug of the first post of popular posts list
    postSlug2 = response.data.posts[1].slug;//get the slug of the second post of popular posts list

    expect(response.status).toBe(200);
    expect(response.data.posts.length).toBeGreaterThan(0);
    console.log("postSlug1: ", postSlug1);
    console.log("postSlug2: ", postSlug2);
  });

  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug1, accessToken);

    expect(response.status).toBe(200);

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug1);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME2); //checks that the post was not created by the user
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBeDefined();
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBe(false);//checks that the post was not upvoted by the user
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  it("Upvote a post for the first time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, postSlug1);

    expect(response.status).toBe(200);
  });

  //dúvida: não passa (considera que deveria dar wasUpvotedByMe = false, que é o que dá no postman --> bug?)
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug1, accessToken);

    expect(response.status).toBe(200);

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug1);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME2); //checks that the post was not created by the user
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBeDefined();
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBe(true);//checks that the post was already upvoted by the user
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  //dúvida: não passa (considera que deveria dar status = 200, que é o que dá no postman --> bug?)
  it("Upvote a post for the second time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, postSlug1);

    log.debug("Message: " + message);
    expect(response.status).toBe(409);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("This post was already upvoted postId {${postId}}, memberId {${memberId}}.");
  });

  //Flow for downvoting a post for the first time and then for the second time
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug2, accessToken);

    expect(response.status).toBe(200);

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug2);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME2); //checks that the post was not created by the user
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBeDefined();
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBe(false); //checks that the post was not downvoted by the user
  });

  it("Downvote a post for the first time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, postSlug2);

    expect(response.status).toBe(200);
  });

  //dúvida: não passa (considera que deveria dar wasDownvotedByMe = false, que é o que dá no postman --> bug?)
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug2, accessToken);

    expect(response.status).toBe(200);

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug2);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME2); //checks that the post was not created by the user
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBeDefined();
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBe(true); //checks that the post was already downvoted by the user
  });

  //dúvida; não passa (considera que deveria dar status = 200, que é o que dá no postman --> bug?)
  it("Downvote a post for the second time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, postSlug2);

    log.debug("Message: " + message);
    expect(response.status).toBe(409);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("This post was already downvoted, postId {${postId}}, memberId {${memberId}}.");
  });

  //Unsuccessful cases for upvoting and downvoting a post
  it("Upvote a post, with an expired access token", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(Constants.EXPIREDTOKEN, postSlug1);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it("Downvote a post, with an expired access token", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(Constants.EXPIREDTOKEN, postSlug2);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it("Upvote a post, with an empty access token", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost("", postSlug1);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("No access token provided");
  });

  it("Downvote a post, with an empty access token", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost("", postSlug2);

    log.debug("Message: " + message);
    expect(response.status).toBe(403);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("No access token provided");
  });

  it("Upvote a post, with an empty slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, "");

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {}.");
  });

  it("Downvote a post, with an empty slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, "");

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {}.");
  });

  it("Upvote a post, with an unexistent slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, Constants.UNEXISTENTPOSTSLUG);

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {" + Constants.UNEXISTENTPOSTSLUG + "}.");
  });

  it("Downvote a post, with an unexistent slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, Constants.UNEXISTENTPOSTSLUG);

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {" + Constants.UNEXISTENTPOSTSLUG + "}.");
  });

  it("Upvote a post, with an empty body request (no slug)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, undefined);

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {undefined}.");
  });

  it("Downvote a post, with an empty body request (no slug)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, undefined);

    log.debug("Message: " + message);
    expect(response.status).toBe(404);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Couldn't find a post by slug {undefined}.");
  });
});

//Flow for cancelling an upvote and then reverting to downvote
describe("Posts Endpoint - Upvote a Post, Downvote a Post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl()); //Log the base url for posts endpoint

    const response1 = await users.post(Constants.USERNAME4, Constants.EMAIL4, Constants.PASSWORD4);//create a new user
    expect(response1.status).toBe(200);
    const response2 = await users.postLogin(Constants.USERNAME4, Constants.PASSWORD4);//login with the new user
    expect(response2.status).toBe(200);
    expect(response2.data.accessToken).toBeDefined();
    expect(response2.data.refreshToken).toBeDefined();
    accessToken = response2.data.accessToken;
    refreshToken = response2.data.refreshToken;
  });

  it("Get popular posts", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPopularPosts();

    postSlug1 = response.data.posts[0].slug;//get the slug of the first post of popular posts list
    postSlug2 = response.data.posts[1].slug;//get the slug of the second post of popular posts list


    expect(response.status).toBe(200);
    expect(response.data.posts.length).toBeGreaterThan(0);
    console.log("postSlug1: ", postSlug1);
    console.log("postSlug2: ", postSlug2);
  });

  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug1, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug1);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(initialPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBe(false); //checks that the post was not upvoted by the user
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  it("Upvote a post for the first time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, postSlug1);

    expect(response.status).toBe(200);
  });

  it("Downvote a post that was previously upvoted by the user (revert the upvote)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, postSlug1);

    expect(response.status).toBe(200);
  });

  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug1, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug1);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(initialPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  it("Downvote a post that was previously upvoted by the user (revert the upvote)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, postSlug1);

    expect(response.status).toBe(200);
  });

  //not passing: bug (does not count the previous downvote)
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug1, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;
    let finalPoints: number = initialPoints - 1;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug1);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(finalPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  //Flow for cancelling a downvote and then reverting to upvote
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug2, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug2);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(initialPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBe(false); //checks that the post was not upvoted by the user
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  it("Downvote a post for the first time", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.downvotePost(accessToken, postSlug2);

    expect(response.status).toBe(200);
  });

  it("Upvote a post that was previously downvoted by the user (cancel the downvote)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, postSlug2);

    expect(response.status).toBe(200);
  });

  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug2, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug2);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(initialPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });

  it("Upvote a post that was previously downvoted by the user (revert the downvote)", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.upvotePost(accessToken, postSlug2);

    expect(response.status).toBe(200);
  });

  //not passing: bug (does not count the previous downvote)
  it("Get a post by its slug", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    const response = await posts.getPostBySlug(postSlug2, accessToken);

    expect(response.status).toBe(200);

    let initialPoints: number = response.data.post.points;
    let finalPoints: number = initialPoints + 1;

    expect(response.data.post).toBeDefined();
    expect(response.data.post.slug).toBe(postSlug2);
    expect(response.data.post.title).toBeDefined();
    expect(response.data.post.createdAt).toBeDefined();
    expect(response.data.post.memberPostedBy).toBeDefined();
    expect(response.data.post.memberPostedBy.reputation).toBeDefined();
    expect(response.data.post.memberPostedBy.user).toBeDefined();
    expect(response.data.post.memberPostedBy.user.username).not.toBe(Constants.USERNAME4);
    expect(response.data.post.numComments).toBeDefined();
    expect(response.data.post.points).toBe(finalPoints);
    expect(response.data.post.text).toBeDefined();
    expect(response.data.post.link).toBeDefined();
    expect(response.data.post.type).toBeDefined();
    expect(response.data.post.wasUpvotedByMe).toBeDefined();
    expect(response.data.post.wasDownvotedByMe).toBeDefined();
  });
});
