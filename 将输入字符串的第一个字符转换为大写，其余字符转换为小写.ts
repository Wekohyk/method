export const uppercase = (s: string) => {
  const [f, ...r] = s;
  return `${f.toUpperCase()}${r.join("").toLowerCase()}`;
};
