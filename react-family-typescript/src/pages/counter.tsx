import React from 'react';

import { connect } from 'react-redux';

import { plus, plusAsync } from '../actions/counter';
import { ICounter } from '../models';

import { IState as IGlobalState } from '../reducers';

import './style/counter.scss';

interface IProps {
  counter: ICounter;
  plusCounter(nums: number): void;
  plusCounterSync(nums: number): void;
}

interface IState {
  plusing: boolean;
}

class CounterPage extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      plusing: false
    };
  }

  render() {
    return (
      <div className="counter">
        <div className="label">{this.props.counter.nums}</div>

        <div className="tools">
          <button type="button" onClick={this.handlePlus}>
            Plus
          </button>
          <button
            className={this.state.plusing ? 'disabled' : ''}
            disabled={this.state.plusing}
            type="button"
            onClick={this.handlePlusAsync}
          >
            {this.state.plusing ? 'Plusing' : 'Plus Async'}
          </button>
        </div>
      </div>
    );
  }

  private handlePlus = () => {
    this.props.plusCounter(1);
  };

  private handlePlusAsync = async () => {
    this.setState({
      plusing: true
    });

    try {
      const res = await this.props.plusCounterSync(1);
      console.log('plus async: ' + res);
    } catch (err) {
      console.log('plus async fail');
    } finally {
      this.setState({
        plusing: false
      });
    }
  };
}

const mapStateToProps = (state: IGlobalState) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch: any) => ({
  plusCounter: (nums: number) => dispatch(plus(nums)),
  plusCounterSync: (nums: number) => dispatch(plusAsync(nums))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
