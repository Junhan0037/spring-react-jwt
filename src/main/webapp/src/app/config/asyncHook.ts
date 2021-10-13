const asyncHook = (time: any, value: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), time);
  })
}

export default asyncHook;