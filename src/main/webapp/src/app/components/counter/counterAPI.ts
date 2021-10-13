// A mock function to mimic making an async request for data
const fetchCount = (amount: number = 1) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export default fetchCount;