

import * as actionCreators from '../actionCreators'
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getLessVoted (offset?: number) {
  return async (dispatch: any) => {

    dispatch(actionCreators.getLessVoted());

    const result = await postService.getLessVoted(offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getLessVotedFailure(error))
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(actionCreators.getLessVotedSuccess(posts));
    }
  };
}

export { getLessVoted };
