import React from 'react';
import '../styles/PostFilters.sass';

/**
 * Tipo que representa os tipos de filtros disponíveis.
 */
export type PostFilterType = 'POPULAR' | 'LESS-VOTED' | 'NEW';

/**
 * Propriedades para o componente `Filter`.
 */
interface FilterProps {
  /**
   * Tipo de filtro.
   */
  filterType: PostFilterType;

  /**
   * Função de retorno de chamada para lidar com a seleção do filtro.
   */
  onClick: (activeFilter: PostFilterType) => void;

  /**
   * Texto exibido no filtro.
   */
  text: string;

  /**
   * Indica se o filtro está ativo.
   */
  activeFilter: PostFilterType;
}

/**
 * Componente funcional que representa um filtro individual.
 */
const Filter: React.FC<FilterProps> = (props) => (
  <div
    onClick={() => props.onClick(props.filterType)}
    className={`post-filter ${
      props.activeFilter === props.filterType ? 'active' : ''
    }`}
  >
    {props.text}
  </div>
);

/**
 * Propriedades para o componente `PostFilters`.
 */
interface PostFilterProps {
  /**
   * Tipo de filtro ativo.
   */
  activeFilter: PostFilterType;

  /**
   * Função de retorno de chamada para lidar com a seleção do filtro.
   */
  onClick: (activeFilter: PostFilterType) => void;
}

/**
 * Componente funcional que agrupa os filtros.
 */
const PostFilters: React.FC<PostFilterProps> = (props) => (
  <div className="post-filters">
    <Filter
      activeFilter={props.activeFilter}
      filterType={'POPULAR'}
      text="Popular"
      onClick={props.onClick}
    />

    <Filter
      activeFilter={props.activeFilter}
      filterType={'LESS-VOTED'}
      text="Lessvoted"
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