export const SEARCH = 'SEARCH';

export function searchChange(e) {
  return {
    type: SEARCH,
    payload: e.target.value,
  };
}
