export function randomFilename() {
  const newFilename = Math.floor(100000 + Math.random() * 900000).toString();

  return newFilename;
}
