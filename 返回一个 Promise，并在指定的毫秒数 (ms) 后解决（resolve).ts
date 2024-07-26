export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function example() {
  console.log("等待 2 秒...");
  await sleep(2000);
  console.log("2 秒后");
}

example();
