const size = {
  xs: `600px`,
  sm: `768px`,
  lg: `1200px`,
};
const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  lg: `(max-width: ${size.lg})`,
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { size, device };
