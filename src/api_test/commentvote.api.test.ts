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
})