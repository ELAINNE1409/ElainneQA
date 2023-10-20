import { UseCase } from "../../../../../shared/core/useCase";
import { GetLessVotedRequestDTO } from "./getLessVotedRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/result";
import { AppError } from "../../../../../shared/core/appError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";
import { PostRepo } from "../../../repos/implementations/sequelizePostRepo";
import Post from "../../../../../shared/infra/database/sequelize/models/Post";

/**
 * Response type for the GetLessVoted use case.
 */
type Response = Either<AppError.UnexpectedError, Result<PostDetails[]>>;

/**
 * Use case for getting less voted posts.
 */
export class GetLessVoted implements UseCase<GetLessVotedRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  /**
   * Creates an instance of GetLessVoted use case.
   *
   * @param postRepo - The repository for posts.
   */
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  
  /**
   * Executes the GetLessVoted use case.
   *
   * @param dto - The request data transfer object.
   * @returns A Promise of the response.
   */
  public async execute(dto: GetLessVotedRequestDTO): Promise<Response> {
    let posts: PostDetails[] = [];
    try {
      const posts = await this.postRepo.getLessVoted();
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return right(Result.ok<PostDetails[]>(posts));
  }
}
