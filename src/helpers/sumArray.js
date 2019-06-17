export default function (items, prop) {
  if (items == null) {
    return 0;
  }
  return items.reduce((a, b) => (b[prop] == null ? a : a + b[prop]), 0);
}
