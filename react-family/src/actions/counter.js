import 'whatwg-fetch';

export const COUNTER_PLUS = 'COUNTER_PLUS';
export function plus(nums = 1) {
  return {
    type: COUNTER_PLUS,
    payload: {
      nums
    }
  };
}

export function plusAsync(nums = 1) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(plus(nums));
        resolve(nums);
      }, 1500);
    });
  };
}
