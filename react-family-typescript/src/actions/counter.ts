import 'whatwg-fetch';

export interface CounterAction {
  type: String;
  payload: {
    nums: number;
  };
}

export const COUNTER_PLUS = 'COUNTER_PLUS';
export function plus(nums = 1): CounterAction {
  return {
    type: COUNTER_PLUS,
    payload: {
      nums
    }
  };
}

export function plusAsync(nums = 1) {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(plus(nums));
        resolve(nums);
      }, 1500);
    });
  };
}
