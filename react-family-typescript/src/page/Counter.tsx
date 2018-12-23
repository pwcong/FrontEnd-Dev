import React from 'react';

import { connect } from 'react-redux';

import { plus, plusAsync } from '../actions/counter';

import style from './style/counter.scss';

interface Props {
  counter: {
    value: number;
  };
  dispatch(e: any): void;
}

interface State {
  plusing: boolean;
}

class Counter extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      plusing: false
    };
  }

  render() {
    return (
      <div className={style.counter}>
        <div className={style.label}>{this.props.counter.value}</div>

        <div className={style.tools}>
          <button type="button" onClick={this.handlePlus}>
            Plus
          </button>
          <button
            className={this.state.plusing ? style.disabled : ''}
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

  private handlePlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.dispatch(plus(1));
  };

  private handlePlusAsync = async (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      plusing: true
    });

    try {
      let res = await this.props.dispatch(plusAsync(1));

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

function select(state: any) {
  return {
    counter: state.counter
  };
}

export default connect(select)(Counter);
