export const SEARCH = 'SEARCH';
export const RESET_SEARCH = 'RESET_SEARCH';

export function searchChange(e) {
  return {
    type: SEARCH,
    payload: e.target.value,
  };
}

export function resetSearch() {
  return {
    type: SEARCH,
    payload: '',
  };
}
