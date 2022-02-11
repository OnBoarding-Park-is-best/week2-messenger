function addPrevZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}

export function dateToFormattedString(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = addPrevZero(date.getMonth() + 1);
  const dd = addPrevZero(date.getDate());
  const hh = addPrevZero(date.getHours());
  const MM = addPrevZero(date.getMinutes());
  const ss = addPrevZero(date.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${MM}:${ss}`;
}

export function ellipsisString(str: string) {
  if (str.length <= 10) return str;
  return `${str.substring(0, 10)}...`;
}
