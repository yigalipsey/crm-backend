export const getIsraelDateTime = () => {
  const israelTimeZone = "Asia/Jerusalem";
  const currentTime = new Date();
  const options = { timeZone: israelTimeZone };

  const israelDateTime = new Date(currentTime.toLocaleString("en-US", options));
  return israelDateTime;
};
