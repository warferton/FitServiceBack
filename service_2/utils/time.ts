
//Delay execution for a specified time
export const wait = (ms : number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};