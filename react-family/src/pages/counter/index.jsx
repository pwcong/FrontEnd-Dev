import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { plus, plusAsync } from '@/actions/counter';

import './style.scss';

const Counter = (props) => {
  const { dispatch, counter } = props;

  const [plusing, setPlusing] = React.useState(false);

  const handlePlus = React.useCallback(() => {
    dispatch(plus(1));
  }, [dispatch]);

  const handlePlusAsync = React.useCallback(async () => {
    setPlusing(true);

    try {
      let res = await dispatch(plusAsync(1));

      console.log('plus async: ' + res);
    } catch (err) {
      console.log('plus async fail');
    } finally {
      setPlusing(false);
    }
  }, [dispatch]);

  return (
    <div className="counter">
      <div className="label">{counter.value}</div>

      <div className="tools">
        <button type="button" onClick={handlePlus}>
          Plus
        </button>
        <button
          className={plusing ? 'disabled' : ''}
          disabled={plusing}
          type="button"
          onClick={handlePlusAsync}
        >
          {plusing ? 'Plusing' : 'Plus Async'}
        </button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  counter: PropTypes.shape({
    value: PropTypes.any,
  }),
  dispatch: PropTypes.func,
};

function select(state) {
  return {
    counter: state.counter,
  };
}

export default connect(select)(Counter);
