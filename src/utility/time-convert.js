export function timeStampToDate(stamp) {
  if (!stamp) return null;
  return new Date(stamp.seconds * 1000);
}
