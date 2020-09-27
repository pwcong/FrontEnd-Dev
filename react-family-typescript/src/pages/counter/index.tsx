import React from 'react';

import { connect } from 'react-redux';

import { plus, plusAsync } from '@/actions/counter';
import { ICounter } from '@/models';
import { IState as IGlobalState } from '@/reducers';

import './style.scss';

interface IProps {
  counter: ICounter;
  plusCounter(nums: number): void;
  plusCounterSync(nums: number): void;
}

const CounterPage: React.FunctionComponent<IProps> = (props: IProps) => {
  const { plusCounter, plusCounterSync, counter } = props;

  const [plusing, setPlusing] = React.useState<boolean>(false);

  const handlePlus = React.useCallback(() => {
    plusCounter(1);
  }, [plusCounter]);

  const handlePlusAsync = React.useCallback(async () => {
    setPlusing(true);

    try {
      const res = await plusCounterSync(1);
      console.log('plus async: ' + res);
    } catch (err) {
      console.log('plus async fail');
    } finally {
      setPlusing(false);
    }
  }, [plusCounterSync]);

  return (
    <div className="counter">
      <div className="label">{counter.nums}</div>

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

const mapStateToProps = (state: IGlobalState) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: any) => ({
  plusCounter: (nums: number) => dispatch(plus(nums)),
  plusCounterSync: (nums: number) => dispatch(plusAsync(nums)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage);
