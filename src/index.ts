import { getHashFromTwitter, redeemAngPao } from "./util";
import cookie from "./token.json";
import consola from "consola";

const config = {
  phoneNumber: "0954950599",
  loopSecond: 5,
};
const cache: string[] = [];
let iCookie = 0;

const main = async () => {
  try {
    const result = await getHashFromTwitter(cookie[iCookie]);
    result.forEach((hash) => {
      if (cache.includes(hash)) return;
      consola.info(`NEW HASH ${hash}`);
      redeemAngPao(hash, config.phoneNumber);
      cache.push(hash);
    });
  } catch (e) {
    if (e === 1) {
      if (iCookie === cookie.length - 1) {
        consola.error("ALL TOKEN RATE LIMIT");
        process.exit();
      }
      iCookie++;
      consola.info(`SWITCH TOKEN TO ${iCookie+1} !!`);
    }
  }
};
(async () => {
  consola.info("START BOT SNIPER TRUEWALLET");
  consola.info(`HAVE ${cookie.length} TOKEN COOKIE`);
  setInterval(main, config.loopSecond * 1000);
})();
