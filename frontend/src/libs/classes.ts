export const classes = (classNames: unknown[]) =>
  classNames.filter((className) => !!className).join(' ')

export default classes
