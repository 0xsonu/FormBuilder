export function IdGenerator(): string {
  return Math.floor(Math.random() * 10000).toString();
}
