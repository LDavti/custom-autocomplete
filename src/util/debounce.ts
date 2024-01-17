const ref = {current: 0};
export const debounce = (fn: TimerHandler, timeout: number) => {
  clearTimeout(ref.current);
  ref.current = setTimeout(fn, timeout);
};
