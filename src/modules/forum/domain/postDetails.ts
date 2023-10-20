import { ValueObject } from "../../../shared/domain/ValueObject";
import { PostLink } from "./postLink";
import { PostText } from "./postText";
import { PostType } from "./postType";
import { PostTitle } from "./postTitle";
import { PostSlug } from "./postSlug";
import { MemberDetails } from "./memberDetails";
import { Result } from "../../../shared/core/Result";
import { IGuardArgument, Guard } from "../../../shared/core/Guard";
import { Post } from "./post";

/**
 * Properties for the PostDetails value object.
 */
interface PostDetailsProps {
  /**
   * Member details.
   */
  member: MemberDetails;

  /**
   * Post slug.
   */
  slug: PostSlug;

  /**
   * Post title.
   */
  title: PostTitle;

  /**
   * Post type.
   */
  type: PostType;

  /**
   * Optional post text.
   */
  text?: PostText;

  /**
   * Optional post link.
   */
  link?: PostLink;

  /**
   * Number of comments on the post.
   */
  numComments: number;

  /**
   * Number of points for the post.
   */
  points: number;

  /**
   * Date and time when the post was posted.
   */
  dateTimePosted: string | Date;

  /**
   * Indicates whether the post was upvoted by the user.
   */
  wasUpvotedByMe: boolean;

  /**
   * Indicates whether the post was downvoted by the user.
   */
  wasDownvotedByMe: boolean;

  /**
   * Array of related posts.
   */
  posts: Post[];
}

/**
 * Value object representing PostDetails.
 */
export class PostDetails extends ValueObject<PostDetailsProps> {
  // Getters to access properties

  get member(): MemberDetails {
    return this.props.member;
  }

  get slug(): PostSlug {
    return this.props.slug;
  }

  get title(): PostTitle {
    return this.props.title;
  }

  get type(): PostType {
    return this.props.type;
  }

  get text(): PostText | undefined {
    return this.props.text;
  }

  get link(): PostLink | undefined {
    return this.props.link;
  }

  get numComments(): number {
    return this.props.numComments;
  }

  get points(): number {
    return this.props.points;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted;
  }

  get wasUpvotedByMe(): boolean {
    return this.props.wasUpvotedByMe;
  }

  get wasDownvotedByMe(): boolean {
    return this.props.wasDownvotedByMe;
  }

  get posts(): Post[] {
    return this.props.posts;
  }

  // Private constructor

  private constructor(props: PostDetailsProps) {
    super(props);
  }

  /**
   * Create a new instance of PostDetails.
   *
   * @param props - PostDetails properties.
   * @returns Result with the created PostDetails or an error.
   */
  public static create(props: PostDetailsProps): Result<PostDetails> {
    const guardArgs: IGuardArgument[] = [
      // Arguments that need to be validated
    ];

    if (props.type === 'link') {
      guardArgs.push({ argument: props.link, argumentName: 'link' });
    } else {
      guardArgs.push({ argument: props.text, argumentName: 'text' });
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<PostDetails>(guardResult.getErrorValue());
    }

    if (!Post.isValidPostType(props.type)) {
      return Result.fail<PostDetails>('Invalid post type provided.');
    }

    // Set default values for 'wasUpvotedByMe' and 'wasDownvotedByMe' properties if necessary

    return Result.ok<PostDetails>(new PostDetails({
      ...props,
      wasUpvotedByMe: props.wasUpvotedByMe || false,
      wasDownvotedByMe: props.wasDownvotedByMe || false,
    }));
  }
}
