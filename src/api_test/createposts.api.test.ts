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

let createdAt: string;
let message: string;
let status: number;

let wasUpvotedByMeX: boolean[] = [];
let wasUpvotedByMe: boolean;

let pointsX: number[] = [];
let points: number;


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

    //7.1 Create a text post - with valid title (2 characters)
    it("Create a text post with a valid title (2 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Pa", "text", "Este post tem um título válido com 2 caracters.", "");
      expect(response.status).toBe(200);
    });

    //7.2 Create a text post - with valid title (85 characters)
    it("Create a text post with a valid title (85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345", "text", "Este post tem um título válido com 2 caracters.", "");
      expect(response.status).toBe(200);
    });

    //7.3 Create a text post - with valid title (Between 2 and 85 characters)
    it("Create a text post with a valid title (Between 2 and 85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Teste de titulo válido", "text", "Este post tem um título válido caracters entre 2 e 85.", "");
      expect(response.status).toBe(200);
    });

     //7.3 Create a text post - with valid title (84 characters)
     it("Create a text post with a valid title (84 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "123456789012345678901234567890123456789012345678901234567890123456789012345678901234", "text", "Este post tem um título válido caracters entre 2 e 85.", "");
      expect(response.status).toBe(200);
    });

    //8. Create a text post - with invalid title (more than 85 characters)
    it("Create a text post with invalid title (more than 85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam sequi nam veritatis, unde reprehenderit excepturi, vero eos cum eveniet atque facere obcaecati ipsa voluptates iusto! Unde aliquid facere esse quisquam ducimus voluptatem recusandae sed molestias excepturi, nesciunt repellendus voluptas numquam expedita quasi distinctio porro libero officiis.Voluptatem eligendi, nam quo blanditiis dignissimos quam natus.Repudiandae, eaque ex voluptatum sequi ipsam velit ipsa aut perspiciatis ducimus error provident eveniet, est praesentium a voluptatibus blanditiis ipsum debitis.Voluptatem dicta impedit rem omnis modi ex dolores error autem mollitia quas eaque totam, culpa ab placeat nobis expedita facilis alias accusantium ? Quod, neque eos.", "text", "Este post tem um título inválido com mais de 85 caracters.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });
    
     //8.1 Create a text post - with valid title (86 characters)
     it("Create a text post with a valid title (86 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456", "text", "Este post tem um título inválido com mais de 85.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //9. Create a text post - with invalid text (less than 13 characters (na mensagem diz 20: O programa está a contar o primeiro caracter como 8))
    it("Create a text post with invalid text (less than 20 characters - 12)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post9", "text", "AE...I...OU.", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //9.1 Create a text post - with invalid text (less than 20 characters)
    it("Create a text post with invalid text (19 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post9.1", "text", "1234567890123456789", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //9.2 Create a text post - with invalid text (less than 20 characters)
    it("Create a text post with invalid text (1 character)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post9.2", "text", "E", "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //9.3 Create a text post - with valid text (20 characters)
    it("Create a text post with valid text (20 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post9.3", "text", "1234567890123456789a", "");
      expect(response.status).toBe(200);
    });

    //10. Create a text post - with invalid text (more than 10000 characters)
    it("Create a text post with invalid text (more than 10000 characters - 10001)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 100001; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10", "text", generatedString, "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //10.1. Create a text post - with valid text (10000 characters)
    it("Create a text post with valid text (10000 characters)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 10000; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10.1", "text", generatedString, "");
      expect(response.status).toBe(200);
    });

    //10.2. Create a text post - with valid text
    it("Create a text post with valid text (1200 characters)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 1200; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10.2", "text", generatedString, "");
      expect(response.status).toBe(200);
    });

    //10.3. Create a text post - with valid text
    it("Create a text post with valid text (9999 characters)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 9999; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10.3", "text", generatedString, "");
      expect(response.status).toBe(200);
    });

      //10.4. Create a text post - with invalid text
    it("Create a text post with invalid text (more than 10000 characters)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 10500; i++) {
        generatedString += "x";
      }
      const response = await posts.createPost(accessToken, "Post10.4", "text", generatedString, "");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //11. Create a text post - with bold text formatting
    it("Create a text post with one word in bold text formatting", async (): Promise<void> => {
      const formattedText = formatText("**bold**");
      const response = await posts.createPost(accessToken, "Post11", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //11.1 Create a text post - with bold text formatting
    it("Create a text post with bold text formatting", async (): Promise<void> => {
      const formattedText = formatText("**Este texto está em bold**");
      const response = await posts.createPost(accessToken, "Post11.1", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //12. Create a text post - with italic text formatting
    it("Create a text post with one word in italic text formatting", async (): Promise<void> => {
      const formattedText = formatText("*italic*");
      const response = await posts.createPost(accessToken, "Post12", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //12.1 Create a text post - with italic text formatting
    it("Create a text post with italic text formatting", async (): Promise<void> => {
      const formattedText = formatText("*Este texto está em italic*");
      const response = await posts.createPost(accessToken, "Post12.1", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //13. Create a text post - with underline text formatting
    it("Create a text post with one word in underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__underline__");
      const response = await posts.createPost(accessToken, "Post13", "text", `Este texto tem uma palavra em ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //13.1 Create a text post - with underline text formatting
    it("Create a text post with underline text formatting", async (): Promise<void> => {
      const formattedText = formatText("__Este texto está em underline__");
      const response = await posts.createPost(accessToken, "Post13.1", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //14. Create a text post - with hyperlink text formatting
    it("Create a text post with text and hyperlink text formatting", async (): Promise<void> => {
      const formattedText = formatText("[hyperlink](https://pt.wikipedia.org/wiki/Mam%C3%ADferos)");
      const response = await posts.createPost(accessToken, "Post14", "text", `Este texto tem um link: ${formattedText}`, "");
      expect(response.status).toBe(200);
    });

    //14.1 Create a text post - with hyperlink text formatting
    it("Create a text post with hyperlink text formatting", async (): Promise<void> => {
      const formattedText = formatText("[hyperlink](https://pt.wikipedia.org/wiki/Mam%C3%ADferos)");
      const response = await posts.createPost(accessToken, "Post14.1", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //15. Create a text post - with code text formatting
    it("Create a text post with code text formatting", async (): Promise<void> => {
      const formattedText = formatText("`Este texto está todo em code format`");
      const response = await posts.createPost(accessToken, "Post15", "text", formattedText, "");
      expect(response.status).toBe(200);
    });

    //15.1 Create a text post - with code text formatting
    it("Create a text post with one word in code text formatting", async (): Promise<void> => {
      const formattedText = formatText("`code format`");
      const response = await posts.createPost(accessToken, "Post15.1", "text", `Este texto tem duas palavras em ${formattedText}`, "");
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

  describe("Posts endpoint - Get a Posts by Slug", (): void => {

    beforeAll(async () => {
      //Get popular posts and store all post slugs
      const response = await posts.getPopularPosts();
      expect(response.status).toBe(200);
      expect(response.data.posts).toBeDefined();
      expect(response.data.posts.length).toBeGreaterThan(0);

      for (const post of response.data.posts) {
        expect(post.slug).toBeDefined();
        postSlugs.push(post.slug);
        expect(post.points).toBeDefined();
        pointsX.push(post.points);
        expect(post.wasUpvotedByMe).toBeDefined();
        wasUpvotedByMeX.push(post.wasUpvotedByMe);
        expect(post.wasDownvotedByMe).toBeDefined();
      }
      postSlug = postSlugs[0];
      console.log("All post Slugs: " + postSlugs);

      points = pointsX[0];
      console.log("All post points: " + pointsX);

      wasUpvotedByMe = wasUpvotedByMeX[0];
      console.log("All post wasUpvotedByMe: " + wasUpvotedByMeX);

    });

    it("Check that the new posts have zero points", async (): Promise<void> => {

      const response = await posts.getPostBySlug(postSlug, accessToken);

      points = response.data.post.points;

      expect(response.status).toBe(200);
      expect(response.data.post.points).toBeDefined();
      expect(response.data.post.points).toBe(0);

      log.debug("postSlug: " + postSlug);
      log.debug("points: " + points);
      log.debug("wasUpvotedByMe: " + wasUpvotedByMe);

    });

    it("Check that the new posts where not upvoted by me", async (): Promise<void> => {

      const response = await posts.getPostBySlug(postSlug, accessToken);

      wasUpvotedByMe = response.data.post.wasUpvotedByMe

      expect(response.status).toBe(200);
      expect(response.data.post.wasUpvotedByMe).toBeDefined();
      expect(response.data.post.wasUpvotedByMe).toBe(false);

      log.debug("postSlug: " + postSlug);
      log.debug("points: " + points);
      log.debug("wasUpvotedByMe: " + wasUpvotedByMe);

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

    //27.1 Create a link post - with valid title (2 characters)
    it("Create a link post with valid title (2 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Li", "link", "", "https://portotechhub.com/switch");
      expect(response.status).toBe(200);
    });

     //27.2 Create a link post - with valid title (85 characters)
     it("Create a link post with valid title (85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "aeiou12345678901234567890123456789012345678901234567890123456789012345678901234567890", "link", "", "https://portotechhub.com/switch");
      expect(response.status).toBe(200);
    });

    //28. Create a link post - with invalid title (more than 85 characters)
    it("Create a link post with invalid title (more than 85 characters)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam sequi nam veritatis, unde reprehenderit excepturi, vero eos cum eveniet atque facere obcaecati ipsa voluptates iusto! Unde aliquid facere esse quisquam ducimus voluptatem recusandae sed molestias excepturi, nesciunt repellendus voluptas numquam expedita quasi distinctio porro libero officiis.Voluptatem eligendi, nam quo blanditiis dignissimos quam natus.Repudiandae, eaque ex voluptatum sequi ipsam velit ipsa aut perspiciatis ducimus error provident eveniet, est praesentium a voluptatibus blanditiis ipsum debitis.Voluptatem dicta impedit rem omnis modi ex dolores error autem mollitia quas eaque totam, culpa ab placeat nobis expedita facilis alias accusantium ? Quod, neque eos.", "link", "", "https://portotechhub.com/");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29. Create a link post - with less than 8 characters
    it("Create a link post - link with less than 8 characters (invalid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29", "link", "", "abc123");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29.1. Create a link post - with less than 8 characters
    it("Create a link post - link with less than 8 characters (valid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.1", "link", "", "abc.pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

     //29.1. Create a link post - with less than 8 characters
     it("Create a link post - link with less than 8 characters - 7 (valid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post292", "link", "", "abcd.pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29.2. Create a link post - with 8 characters
    it("Create a link post - link with 8 characters (invalid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.2", "link", "", "abc123pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

     //29.3. Create a link post - with 8 characters
     it("Create a link post - link with 8 characters (valid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.3", "link", "", "aeiou.pt");
      expect(response.status).toBe(200);
    });

    //29.4. Create a link post - with more than 8 characters
    it("Create a link post - link with more than 8 characters - 9 (invalid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.4", "link", "", "abc1234pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

     //29.4. Create a link post - with 8 characters
     it("Create a link post - link with more than 8 characters - 9 (valid url)", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.3", "link", "", "aeiou.com");
      expect(response.status).toBe(200);
    });
    
/* 
    //29.4. Create a link post - with 3 characters
    it("Create a link post - link with 3 characters", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.4", "link", "", "u.t");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29.5. Create a link post - with 3 characters
    it("Create a link post - link with 3 characters .pt", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.5", "link", "", ".pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //29.6. Create a link post - with 4 characters
    it("Create a link post - link with 4 characters .pt", async (): Promise<void> => {
      const response = await posts.createPost(accessToken, "Post29.6", "link", "", "u.pt");
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });
 */
    //30. Create a link post - with more than 500 characters
   it("Create a link post - link with more than 500 characters (valid url)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 505; i++){
        generatedString += "x";
      }
      const longLink = `${generatedString}.com`;
      const response = await posts.createPost(accessToken, "Post30", "link", "", longLink);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    }); 
    
    //30.1. Create a link post - with 500 characters
    it("Create a link post - link with 500 characters (valid url)", async (): Promise<void> => {
      let generatedString = "";
      for (let i = 0; i < 496; i++){
        generatedString += "x";
      }
      const longLink = `${generatedString}.com`;
      const response = await posts.createPost(accessToken, "Post30.1", "link", "", longLink);
      expect(response.status).toBe(200);
    });

      //30.2. Create a link post - with 500 characters
     it("Create a link post - link with 500 characters without (invalid url)", async (): Promise<void> => {
      let longLink = "";
      for (let i = 0; i < 500; i++){
        longLink += "x";
      }
      const response = await posts.createPost(accessToken, "Post30.2", "link", "", longLink);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

    //30.2.1 Create a link post - with 501 characters
    it("Create a link post - link with 501 characters", async (): Promise<void> => {
     let generatedString = "";
      for (let i = 0; i <= 496; i++){
        generatedString += "x";
      }
      const longLink = `${generatedString}.com`;

      const response = await posts.createPost(accessToken, "Post30.2.1", "link", "", longLink);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
    });

      //30.3. Create a link post - with 100 characters
      it("Create a link post - link with 100 characters", async (): Promise<void> => {
        let generatedString = "";
        for (let i = 0; i < 96; i++){
          generatedString += "x";
        }
        const longLink = `${generatedString}.com`;
        const response = await posts.createPost(accessToken, "Post30.3", "link", "", longLink);
        expect(response.status).toBe(200);
      });

      //30.4. Create a link post - with 66 characters
      it("Create a link post - link with 66 characters", async (): Promise<void> => {
        let generatedString = "";
        for (let i = 0; i < 62; i++){
          generatedString += "x";
        }
        const longLink = `${generatedString}.com`;
        const response = await posts.createPost(accessToken, "Post30.4", "link", "", longLink);
        expect(response.status).toBe(200);
      });

      //30.5. Create a link post - with 67 characters
      it("Create a link post - link with 67 characters", async (): Promise<void> => {
        let generatedString = "";
        for (let i = 0; i < 63; i++){
          generatedString += "x";
        }
        const longLink = `${generatedString}.com`;
        const response = await posts.createPost(accessToken, "Post30.5", "link", "", longLink);
        expect(response.status).toBe(200);
      });
      //30.6. Create a link post - with 68 characters
      it("Create a link post - link with 68 characters", async (): Promise<void> => {
        let generatedString = "";
        for (let i = 0; i < 64; i++){
          generatedString += "x";
        }
        const longLink = `${generatedString}.com`;
        const response = await posts.createPost(accessToken, "Post30.6", "link", "", longLink);
        expect(response.status).toBe(200);
      });
        
  });

});
