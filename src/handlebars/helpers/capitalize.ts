export default (aString: string) => {
  return aString.replace(/^\w/, (c) => c.toUpperCase());
};
