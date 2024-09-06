export function checkForLost(row) {
  return row.some(block => block.isEmpty);
}
