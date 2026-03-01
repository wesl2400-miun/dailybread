
export const randOpt = (options) => {
  const limit = options.length;
  const dice = Math.floor(Math.random() * limit);
  return options[dice];
}