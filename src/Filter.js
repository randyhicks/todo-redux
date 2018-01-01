import React from 'react';
import { connect } from 'react-redux';
import { doSetFilter } from './index';

const Filter = ({ onSetFilter }) => {
  return (
    <div>
      <button type="button" onClick={() => onSetFilter('SHOW_ALL')}>
        All
      </button>
      <button type="button" onClick={() => onSetFilter('SHOW_COMPLETED')}>
        Completed
      </button>
      <button type="button" onClick={() => onSetFilter('SHOW_INCOMPLETED')}>
        Incompleted
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  onSetFilter: filterType => doSetFilter(filterType)
};

const FilterContainer = connect(null, mapDispatchToProps)(Filter);

export default FilterContainer;
