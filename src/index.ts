import { getHashFromTwitter, redeemAngPao } from "./util";
import consola from "consola";

const config = {
  phoneNumber: ["0954950599", "0842585799", "0926305287"],
  loopSecond: 1,
};

// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// Please run with bun using the following command: `bun ./src/index.ts`
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================

const cache: string[] = [];
let iCookie = 0;

const tokens: Array<string> = (await Bun.file("./token.txt").text()).split(
  "\n"
);
const main = async () => {
  try {
    let token = tokens[iCookie].split("|");
    const result = await getHashFromTwitter(token[0], token[1]);
    result.forEach((hash) => {
      if (cache.includes(hash)) return;
      consola.info(`NEW HASH ${hash}`);
      config.phoneNumber.forEach((_) => {
        redeemAngPao(hash, _);
      });
      cache.push(hash);
    });
  } catch (e) {
    if (e === 1) {
      iCookie++;
      if (iCookie === tokens.length - 1) {
        consola.error("RESET TOKEN TO 1");
        iCookie = 0;
      }
      consola.info(`SWITCH TOKEN TO ${iCookie + 1} !!`);
    }
  }
};
(async () => {
  consola.info("START BOT SNIPER TRUEWALLET");
  consola.info(
    `HAVE ${tokens.length} TOKEN AND COOKIE LOOP ${config.loopSecond} SEC`
  );
  setInterval(main, config.loopSecond * 1000);
})();
