import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import PostFilters, {
  PostFilterType
} from '../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../modules/forum/models/Post';
import { DateUtil } from '../shared/utils/DateUtil';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import { UsersState } from '../modules/users/redux/states';

/**
 * @ignore
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersOperators from '../modules/users/redux/operators';
import * as forumOperators from '../modules/forum/redux/operators';
import { User } from '../modules/users/models/user';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import { ForumState } from '../modules/forum/redux/states';
import withVoting from '../modules/forum/hocs/withVoting';

interface IndexPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
}

interface IndexPageState {
  activeFilter: PostFilterType;
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    };
  }

  onClickJoinButton() {}

  /**
   * Sets the active filter.
   * @param filter - The filter to set.
   */
  setActiveFilter(filter: PostFilterType) {
    this.setState({
      ...this.state,
      activeFilter: filter
    });
  }

  /**
   * Gets posts based on the active filter.
   */
  getPosts() {
    const activeFilter = this.state.activeFilter;

    if (activeFilter === 'NEW') {
      this.props.getRecentPosts();
    } else if (activeFilter === 'LESS-VOTED') {
      this.props.getLessVoted();
    } else {
      this.props.getPopularPosts();
    }
  }

  /**
   * Handles the filter change.
   * @param prevState - The previous state.
   */
  onFilterChanged(prevState: IndexPageState) {
    const currentState: IndexPageState = this.state;
    if (prevState.activeFilter !== currentState.activeFilter) {
      this.getPosts();
    }
  }

  /**
   * Sets the active filter on page load.
   */
  setActiveFilterOnLoad() {
    const showNewFilter = (this.props.location.search as string).includes('show=new');
    const showPopularFilter = (this.props.location.search as string).includes('show=popular');

    let activeFilter = this.state.activeFilter;

    if (showNewFilter) {
      activeFilter = 'NEW';
    }

    this.setState({
      ...this.state,
      activeFilter
    });
  }

  /**
   * Gets posts from the active filter group.
   * @returns An array of Post objects.
   */
  getPostsFromActiveFilterGroup(): Post[] {
    if (this.state.activeFilter === 'NEW') {
      return this.props.forum.recentPosts;
    } else {
      return this.props.forum.popularPosts;
    }
  }

  componentDidUpdate(prevProps: IndexPageProps, prevState: IndexPageState) {
    this.onFilterChanged(prevState);
  }

  componentDidMount() {
    this.setActiveFilterOnLoad();
    this.getPosts();
  }

  render() {
    console.log(this.props);
    const { activeFilter } = this.state;
    return (
      <Layout>
        <div className="headerContainer flex flexRow flexCenter flexEven">
          <Header
            title="DomainDrivenDesigners"
            subtitle="Where awesome DomainDriven Designers are made"
          />
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={
              this.props.users.isAuthenticated
                ? (this.props.users.user as User).username
                : ''
            }
            onLogout={() => this.props.logout()}
          />
        </div>
        <br />
        <br />

        <PostFilters
          activeFilter={activeFilter}
          onClick={(filter) => this.setActiveFilter(filter)}
        />
        {this.getPostsFromActiveFilterGroup().map((p, i) => (
          <PostRow
            key={i}
            onUpvoteClicked={() => this.props.upvotePost(p.slug)}
            onDownvoteClicked={() => this.props.downvotePost(p.slug)}
            isLoggedIn={this.props.users.isAuthenticated}
            {...p}
          />
        ))}
      </Layout>
    );
  }
}

function mapStateToProps({
  users,
  forum
}: {
  users: UsersState;
  forum: ForumState;
}) {
  return {
    users,
    forum
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
      ...forumOperators
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(withLogoutHandling(withVoting(IndexPage)));
