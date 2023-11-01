import { GetLessVoted } from "./getLessVoted";
import { postRepo } from "../../../repos";
import { GetLessVotedController } from "./getLessVotedController";


/**
 * Instance of the GetLessVoted use case.
 */
const getLessVoted = new GetLessVoted(postRepo);

/**
 * Instance of the GetLessVotedController to handle HTTP requests.
 */
const getLessVotedController = new GetLessVotedController(getLessVoted);

export { getLessVoted, getLessVotedController };