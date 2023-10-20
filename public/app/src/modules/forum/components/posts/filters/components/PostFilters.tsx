
import React from 'react';

import '../styles/PostFilters.sass';

/**
 * Represents the possible post filter types.
 */
export type PostFilterType = 'POPULAR' | 'LESS-VOTED' | 'NEW';

/**
 * Represents the properties for a filter component.
 */
interface FilterProps {
  /**
   * The active filter type.
   */
  activeFilter: PostFilterType;

  /**
   * The filter type for this component.
   */
  filterType: PostFilterType;

  /**
   * Callback function to handle click events.
   */
  onClick: (activeFilter: PostFilterType) => void;

  /**
   * The text to display in the filter component.
   */
  text: string;
}

/**
 * A filter component to select a specific filter.
 */
const Filter: React.FC<FilterProps> = (props) => (
  <div
    onClick={() => props.onClick(props.filterType)}
    className={`postFilter ${
      props.activeFilter === props.filterType ? 'active' : ''
    }`}
  >
    {props.text}
  </div>
);

/**
 * Represents the properties for the PostFilters component.
 */
interface PostFilterProps {
  /**
   * The active filter type.
   */
  activeFilter: PostFilterType;

  /**
   * Callback function to handle filter selection.
   */
  onClick: (activeFilter: PostFilterType) => void;
}

/**
 * A component to display and select post filters.
 */
const PostFilters: React.FC<PostFilterProps> = (props) => (
  <div className="postFilters">
    <Filter
      activeFilter={props.activeFilter}
      filterType={'POPULAR'}
      text="Popular"
      onClick={props.onClick}
    />
    <Filter
      activeFilter={props.activeFilter}
      filterType={'LESS-VOTED'}
      text="Less-Voted"
      onClick={props.onClick}
    />

    <Filter
      activeFilter={props.activeFilter}
      filterType={'NEW'}
      text="New"
      onClick={props.onClick}
    />
  </div>
);

export default PostFilters;
