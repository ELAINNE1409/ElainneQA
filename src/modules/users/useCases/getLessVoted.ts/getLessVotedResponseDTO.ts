import { PostDTO } from "../../../dtos/postDTO";

/**
 * Data Transfer Object (DTO) for the GetLessVoted use case response.
 */
export interface GetLessVotedResponseDTO {
  /**
   * An array of post data transfer objects.
   */
  posts: PostDTO[];
}