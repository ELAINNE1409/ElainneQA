import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Comment from "./endpoints/Comments";
import User from "./endpoints/Users";
import Post from "./endpoints/Posts";
import CreatePost from "./endpoints/Posts";
import { AxiosResponse } from "axios";
import UserConstants from "./config/constants";
import { formatText } from "./config/formatText";
import { getPopularPosts } from "../modules/forum/useCases/post/getPopularPosts";
import { format } from "path";

const config = ConfigHandler.getInstance();
const log = new Logger({
    minLevel: config.environmnetConfig.log_level,
    dateTimeTimezone:
        config.environmnetConfig.time_zone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let accessToken: string;
let refreshToken: string;
let postSlug: string;
let users: User;
let posts: CreatePost
let popularPost: Post;
let comments: Comment;
let replyPost: Comment;
let commentId: string;
let parentCommentId: string;
let replyCommentId: string;
let wasUpvotedByMe: boolean;

describe("Flow for the comments endpoint", () => {

    beforeAll(async () => {

        users = new User();
        posts = new CreatePost();
        popularPost = new Post();
        comments = new Comment();

        log.debug("Comments Base url: " + comments.getBaseUrl());

        // Create a user
        await users.post(UserConstants.USERNAME, UserConstants.EMAIL, UserConstants.PASSWORD);

        // Login
        const response = await users.postLogin(UserConstants.USERNAME, UserConstants.PASSWORD);

        // Get and save the access token and refresh token
        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;

        log.debug("Access token: " + accessToken);
        log.debug("Refresh token: " + refreshToken);

    });

    describe("Create a Post", () => {

        it("Create a post", async (): Promise<void> => {

            const response = await posts.createPost(
                accessToken,
                UserConstants.TITLE,
                UserConstants.POSTTYPE1,
                UserConstants.POSTCONTENT,
                UserConstants.EMPTYSTRING
            );

            expect(response.status).toBe(200);

        });

    });

    describe("Get posts", () => {

        it("Get all posts", async (): Promise<void> => {

            const response = await popularPost.getPopularPosts();

            postSlug = response.data.posts[0].slug;

            expect(response.status).toBe(200);
            expect(response.data.posts.length).toBeGreaterThan(0);

        });

        it("Get a post.", async (): Promise<void> => {

            const response = await comments.getCommentsByPostSlug(postSlug);

            expect(response.status).toBe(200);

        });

        it("Get a post with invalid slug.", async (): Promise<void> => {

            const response = await comments.getCommentsByPostSlug(UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200); //Retrieves an empty array

        });


    });


    describe("Create a comment on a post", () => {

        async function getPopularPosts(postNumber: number): Promise<string> {

            const response = await popularPost.getPopularPosts();
            const postSlug: string = response.data.posts[postNumber].slug;

            return postSlug;

        }


        it("Create a comment with valid content", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const response = await comments.replyToPost(
                accessToken,
                postSlug,
                UserConstants.POSTCOMMENT
            );

            expect(response.status).toBe(200);

        });

        it("Check that the comment was created", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const response = await comments.getCommentsByPostSlug(postSlug);

            expect(response.status).toBe(200);

        });

        it("Create another comment with valid content", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT);

            expect(response.status).toBe(200);

        });

        it("Create a comment with a word in bold", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("**bold**");

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment with a word in italic", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("*italic*");

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment with a word in underline", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("__underline__");

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment with a word with hyperlink format", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("[hyperlink](https://www.google.com)");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment with a word with code format", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("```code```");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment in bold and italic", async (): Promise<void> => {

            const postSlug = await getPopularPosts(0);

            expect(postSlug).toBeDefined();

            const formattedText = formatText("**bold** *italic*");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment in bold and underline", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            const formattedText = formatText("**bold** __underline__");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment in italic and underline", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            const formattedText = formatText("*italic* __underline__");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment in bold, italic and underline", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            const formattedText = formatText("**bold** *italic* __underline__");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment in bold, hyperlink format and italic", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            const formattedText = formatText("**bold** [hyperlink](https://www.google.com) *italic*");

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + formattedText);

            expect(response.status).toBe(200);

        });

        it("Create a comment with special characters", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENT + UserConstants.COMMENTWITHSPECIALCHARACTERS);

            expect(response.status).toBe(200);

        });

        it("Create a comment with invalid content - with 3 characters", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENTINVALID);

            expect(response.status).not.toBe(200);

        });

        it("Create a comment with no content", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.EMPTYCOMMENT);

            expect(response.status).not.toBe(200);

        });

        it("Create a comment with no token", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(UserConstants.EMPTYTOKEN, postSlug, UserConstants.POSTCOMMENT);

            expect(response.status).not.toBe(200);

        });

        it("Create a comment with invalid token", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(UserConstants.EXPIREDTOKEN, postSlug, UserConstants.POSTCOMMENT);

            expect(response.status).not.toBe(200);

        });

        it("Create a comment with 10 000 characters", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const comment = Array(10001).join("a");
            console.log("raiva3:", comment.length);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, comment);

            expect(response.status).toBe(200);
            expect(comment.length).toBeGreaterThan(9999);

        });

        it("Create a comment with more than 10000 characters", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const comment = Array(10011).join("a");
            console.log("raiva:", comment.length);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, comment);

            expect(response.status).not.toBe(200);
            expect(comment.length).toBeGreaterThan(10000);

        });

        it("Create a comment with less than 20 characters", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const comment = Array(19).join("a");

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, comment);

            expect(response.status).not.toBe(200);
            expect(comment.length).toBeLessThan(20);

        });

        it("Create a comment with emoji", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENTWITHEMOJI);

            expect(response.status).toBe(200);

        });

        it("Create a comment with only emoji", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENTONLYEMOJI);

            expect(response.status).not.toBe(200);

        });

        it("Create a comment with unicode", async (): Promise<void> => {

            expect(postSlug).toBeDefined();
            expect(postSlug.length).toBeGreaterThan(0);

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.replyToPost(accessToken, postSlug, UserConstants.POSTCOMMENTWITHUNICODE);

            expect(response.status).toBe(200);

        });

    });

    describe("Get comments from posts", () => {

        it("Get comments by post slug", async (): Promise<void> => {

            expect(postSlug).toBeDefined();

            log.debug("Access token: " + accessToken);

            const response: AxiosResponse = await comments.getCommentsByPostSlug(postSlug);

            expect(response.status).toBe(200);
            expect(response.data.comments.length).toBeGreaterThan(0);

            commentId = response.data.comments[0].commentId;

        });

        it("Get comments by commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.getCommentByCommentId(accessToken, commentId);

            parentCommentId = response.data.comment.parentCommentId;

            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();

        });

        it("Get comments by commentId with invalid token", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.getCommentByCommentId(UserConstants.EXPIREDTOKEN, commentId);

            expect(response.status).not.toBe(200);

        });

        it("Get comments by commentId with no token", async (): Promise<void> => {

            const response = await comments.getCommentByCommentId(UserConstants.EMPTYTOKEN, commentId);

            expect(response.status).toBe(200);

        });

        it("Get comments by commentId with invalid commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.getCommentByCommentId(accessToken, UserConstants.INVALIDCOMMENTID);

            expect(response.data.message).toContain("Couldn't find a comment by comment id {5f9f9f9f9f9f9f9f9f9f9f9f}.");
            //expect(response.status).not.toBe(200);

        });

        it("Get comments by commentId with no commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.getCommentByCommentId(accessToken, UserConstants.EMPTYID);

            expect(response.status).not.toBe(200);

        });
    });

    describe("Vote on comments", () => {

        it("Upvote a comment", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.upvoteComment(accessToken, commentId);

            expect(response.status).toBe(200);

        });


        it("Upvote a comment again and void the vote", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.upvoteComment(accessToken, commentId);

            expect(response.status).toBe(200);
        });

        it("Get comments by commentId to check if the vote is registered", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.getCommentByCommentId(accessToken, commentId);

            expect(response.status).toBe(200);

        });

        it("Downvote a comment", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.downvoteComment(accessToken, commentId);

            expect(response.status).toBe(200);

        });

        it("Downvote a comment again and void the vote", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.downvoteComment(accessToken, commentId);

            expect(response.status).toBe(200);

        });

        it("Upvote a comment with invalid token", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.upvoteComment(UserConstants.EXPIREDTOKEN, commentId);

            expect(response.status).not.toBe(200);

        });

        it("Upvote a comment with no token", async (): Promise<void> => {

            const response = await comments.upvoteComment(UserConstants.EMPTYTOKEN, commentId);

            expect(response.status).not.toBe(200);

        });

        it("Upvote a comment with invalid commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.upvoteComment(accessToken, UserConstants.INVALIDCOMMENTID);

            expect(response.status).not.toBe(200);

        });

        it("Downvote a comment with invalid token", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.downvoteComment(UserConstants.EXPIREDTOKEN, commentId);

            expect(response.status).not.toBe(200);

        });

        it("Downvote a comment with no token", async (): Promise<void> => {

            const response = await comments.downvoteComment(UserConstants.EMPTYTOKEN, commentId);

            expect(response.status).not.toBe(200);

        });

        it("Downvote a comment with invalid commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.downvoteComment(accessToken, UserConstants.INVALIDCOMMENTID);

            expect(response.status).not.toBe(200);

        });

    });

    describe("Reply to a comment", () => {

        it("Reply to a comment", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY, UserConstants.EMPTYSTRING);;

            expect(response.status).toBe(200);

        });

        /* it("Get comments by commentId to check if the reply is registered", async (): Promise<void> => {
 
             log.debug("Access token: " + accessToken);
 
             const response = await comments.getCommentByCommentId(accessToken, commentId);
 
             expect(response.status).toBe(200);
             expect(response.data).toBeDefined();
 
         });*/

        it("Reply to a comment with less than 20 characters - 3 characters", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.POSTCOMMENTINVALID, UserConstants.EMPTYSTRING);;

            expect(response.status).not.toBe(200);
        });

        it("Reply to a comment with no content", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.EMPTYCOMMENT, UserConstants.EMPTYSTRING);;

            expect(response.status).not.toBe(200);

        });

        it("Reply to a comment with more than 10000 characters", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);
            const comment = Array(10011).join("a");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, comment, UserConstants.EMPTYSTRING);;
            expect(response.status).not.toBe(200);

        });

        it("Reply to a comment with 10000 characters", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);
            const comment = Array(10000).join("a");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, comment, UserConstants.EMPTYSTRING);;
            expect(response.status).toBe(200);

        });

        it("Reply to a comment in bold", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("**bold**");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);

        });

        it("Reply to a comment in italics", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("*italics*");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);

        });

        it("Reply to a comment in underline", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("__underline__");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);

        });

        it("Reply to a comment with hyperlink", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("[hyperlink](https://www.google.com)");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);
        });

        it("Reply to a comment with code format", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("```code```");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);

        });

        it("Reply to a comment in bold, italics, underline, hyperlink and code format", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const formattedText = formatText("**bold**,  *italics*, __underline__, [hyperlink](https://www.google.com), `code`");
            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY + formattedText, UserConstants.EMPTYSTRING);

            expect(response.status).toBe(200);

        });

        it("Reply to a reply to a comment", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToComment(accessToken, commentId, postSlug, UserConstants.COMMENTREPLY, parentCommentId);

            expect(response.status).toBe(200);

        });

        it("Reply to a comment with invalid token", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToComment(UserConstants.EXPIREDTOKEN, commentId, postSlug, UserConstants.COMMENTREPLY, UserConstants.EMPTYSTRING);

            expect(response.status).not.toBe(200);

        });

        it("Reply to a comment with no token", async (): Promise<void> => {

            const response = await comments.replyToComment(UserConstants.EMPTYSTRING, commentId, postSlug, UserConstants.COMMENTREPLY, UserConstants.EMPTYSTRING);

            expect(response.status).not.toBe(200);

        });

        it("Reply to a comment with invalid commentId", async (): Promise<void> => {

            log.debug("Access token: " + accessToken);

            const response = await comments.replyToComment(accessToken, UserConstants.INVALIDCOMMENTID, postSlug, UserConstants.COMMENTREPLY, UserConstants.EMPTYSTRING);

            expect(response.status).not.toBe(200);

        });

    });

});