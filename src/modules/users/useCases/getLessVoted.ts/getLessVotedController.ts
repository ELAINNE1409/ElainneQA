import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetLessVotedRequestDTO } from "./getLessVotedRequestDTO";
import { GetLessVoted } from "./getLessVoted";
import { GetLessVotedResponseDTO } from "./getLessVotedResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";

/**
 * Controller for handling the GetLessVoted use case.
 */
export class GetLessVotedController extends BaseController {
  private useCase: GetLessVoted;

  /**
   * Creates an instance of GetLessVotedController.
   *
   * @param useCase - The GetLessVoted use case.
   */
  constructor(useCase: GetLessVoted) {
    super();
    this.useCase = useCase;
  }

  /**
   * Executes the GetLessVoted use case and handles the HTTP request.
   *
   * @param req - The HTTP request.
   * @param res - The HTTP response.
   * @returns A Promise with the HTTP response.
   */
  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response,
  ): Promise<any> {
    const dto: GetLessVotedRequestDTO = {
      offset: req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const postDetails = result.value.getValue();
        return this.ok<GetLessVotedResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d)),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}