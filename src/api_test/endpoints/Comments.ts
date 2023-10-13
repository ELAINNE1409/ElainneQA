/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/ 

import { AxiosResponse } from "axios";

import { AEndpoint } from "./abstracts/AEndpoint";


export default class Comment extends AEndpoint {
    constructor() {
        super("/comments", "comments");
    }

    public async getCommentsByPostSlug(slug: string): Promise<AxiosResponse> {
        return this.restClient.sendGet({
            route: "/",
            params: { slug: slug }
        });
    }

    public async getCommentByCommentId(accessToken: string, commentId: string): Promise<AxiosResponse> {
        return this.restClient.sendGet({
            route: `/${commentId}`,
            headers: { "Authorization": accessToken }
        });
    }

    public async replyToPost(accessToken: string, slug: string, comment: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: "/",
            headers: { "Authorization": accessToken },
            params: { slug: slug },
            data: { comment: comment }
        });
    }

    public async replyToComment(accessToken: string, commentId: string, slug: string, comment: string, parentCommentId: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: `/${commentId}/reply`,
            headers: { "Authorization": accessToken },
            params: { slug: slug },
            data: { comment: comment, parentCommentId: parentCommentId }
        });
    }

    public async upvoteComment(accessToken: string, commentId: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: `/${commentId}/upvote`,
            headers: { "Authorization": accessToken },
            data: { commentId: commentId }
        });
    }

    public async downvoteComment(accessToken: string, commentId: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: `/${commentId}/downvote`,
            headers: { "Authorization": accessToken },
            data: { commentId: commentId }
        });
    }

}