
export const stateInfo = (info) => {
  const state = info.split(', ');
  const last = state.length - 1;
  return state[last];
}