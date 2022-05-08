export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date(Date.now());
  const adjExpirationTime = new Date(expirationTime);

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};
