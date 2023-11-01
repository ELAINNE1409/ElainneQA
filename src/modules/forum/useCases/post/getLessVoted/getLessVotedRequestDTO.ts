
/**
 * Data Transfer Object (DTO) for the GetLessVoted use case request.
 */
export interface GetLessVotedRequestDTO {
  /**
   * Optional offset for pagination.
   */
  offset?: number;

  /**
   * Optional user ID.
   */
  userId?: string;
}
