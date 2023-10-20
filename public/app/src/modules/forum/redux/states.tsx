
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";

export interface ForumState {
  isSubmittingPost: boolean;
  isSubmittingPostSuccess: boolean;
  isSubmittingPostFailure: boolean;

  isGettingRecentPosts: boolean;
  isGettingRecentPostsSuccess: boolean;
  isGettingRecentPostsFailure: boolean;

  isGettingPostsLessVoted: boolean;
  isGettingPostsLessVotedSuccess: boolean;
  isGettingPostsLessVotedFailure: boolean;
  
  isGettingPostBySlug: boolean;
  isGettingPostBySlugSuccess: boolean;
  isGettingPostBySlugFailure: boolean;

  isCreatingReplyToPost: boolean;
  isCreatingReplyToPostSuccess: boolean;
  isCreatingReplyToPostFailure: boolean;

  isGettingComments: boolean;
  isGettingCommentsSuccess: boolean;
  isGettingCommentsFailure: boolean;

  isGettingPopularPosts: boolean;
  isGettingPopularPostsSuccess: boolean;
  isGettingPopularPostsFailure: boolean;

  isGettingCommentByCommentId: boolean;
  isGettingCommentByCommentIdSuccess: boolean;
  isGettingCommentByCommentIdFailure: boolean;

  isCreatingReplyToComment: boolean;
  isCreatingReplyToCommentSuccess: boolean;
  isCreatingReplyToCommentFailure: boolean;

  isUpvotingComment: boolean;
  isUpvotingCommentSuccess: boolean;
  isUpvotingCommentFailure: boolean;

  isDownvotingComment: boolean;
  isDownvotingCommentSuccess: boolean;
  isDownvotingCommentFailure: boolean;

  isUpvotingPost: boolean;
  isUpvotingPostSuccess: boolean;
  isUpvotingPostFailure: boolean;

  isDownvotingPost: boolean;
  isDownvotingPostSuccess: boolean;
  isDownvotingPostFailure: boolean;

  recentPosts: Post[];
  popularPosts: Post[];
  PostLessVoted: Post[];

  post: Post | {};

  comments: Comment[];

  comment: Comment | {};

  error: string;
}

const initialForumState: ForumState = {
  isSubmittingPost: false,
  isSubmittingPostSuccess: false,
  isSubmittingPostFailure: false,

  isGettingRecentPosts: false,
  isGettingRecentPostsSuccess: false,
  isGettingRecentPostsFailure: false,

  isGettingPostsLessVoted: false,
  isGettingPostsLessVotedSuccess: false,
  isGettingPostsLessVotedFailure: false,

  isGettingPostBySlug: false,
  isGettingPostBySlugSuccess: false,
  isGettingPostBySlugFailure: false,

  isCreatingReplyToPost: false,
  isCreatingReplyToPostSuccess: false,
  isCreatingReplyToPostFailure: false,

  isGettingComments: false,
  isGettingCommentsSuccess: false,
  isGettingCommentsFailure: false,

  isGettingPopularPosts: false,
  isGettingPopularPostsSuccess: false,
  isGettingPopularPostsFailure: false,

  isGettingCommentByCommentId: false,
  isGettingCommentByCommentIdSuccess: false,
  isGettingCommentByCommentIdFailure: false,

  isCreatingReplyToComment: false,
  isCreatingReplyToCommentSuccess: false,
  isCreatingReplyToCommentFailure: false,

  isUpvotingComment: false,
  isUpvotingCommentSuccess: false,
  isUpvotingCommentFailure: false,

  isDownvotingComment: false,
  isDownvotingCommentSuccess: false,
  isDownvotingCommentFailure: false,

  isUpvotingPost: false,
  isUpvotingPostSuccess: false,
  isUpvotingPostFailure: false,

  isDownvotingPost: false,
  isDownvotingPostSuccess: false,
  isDownvotingPostFailure: false,

  comments: [],

  recentPosts: [],
  popularPosts: [],
  PostsLessVoted: [{slug: "teste",
  

    title: "Elainne",

    createdAt: '2015',

    postAuthor: "Elainne",

    numComments: 10,

    points: 10,

    type: "text",

    text: "teste",

    link: "teste",

    wasUpvotedByMe: false,

    wasDownvotedByMe: false}, {slug: "teste",
  

    title: "Outubro",

    createdAt: '2023',

    postAuthor: "Elainne",

    numComments: 21,

    points: 7,

    type: "text",

    text: "teste2",

    link: "teste2",

    wasUpvotedByMe: false,

    wasDownvotedByMe: false}],


  post: {},

  comment: {},

  error: ''
}

export default initialForumState;
