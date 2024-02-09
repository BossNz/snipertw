(async () => {
  const str = (await Bun.file("./token.txt").text()).split("\n");
  const result: string[] = [];
  const arr = str.map((_) => {
    if (result.includes(_)) return;
    result.push(_);
  });
  console.log(result.join("\n"));
})();
