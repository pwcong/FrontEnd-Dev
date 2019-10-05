import 'whatwg-fetch';

export const COUNTER_PLUS = 'COUNTER_PLUS';

export const plus = (nums = 1) => ({
  type: COUNTER_PLUS,
  payload: {
    nums
  }
});

export const plusAsync = (nums = 1) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch(plus(nums));
      resolve(nums);
    }, 1500);
  });
};
