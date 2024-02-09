import { ofetch } from "ofetch";
import consola from "consola";

(async () => {
  try {
    //https://54.251.227.82/campaign/vouchers/75ffb24ca9f6462e9c6f5b43e61f99fcb98/verify
    const result = await ofetch(
      `https://54.251.227.82/campaign/vouchers/4bac0ec36906944f398821d2a60e1323049/redeem`,
      {
        method: "POST",
        body: { mobile: "0954950599" },
        headers: {
          Host: "gift.truemoney.com",
        },
      }
    );
    consola.success(result);
  } catch (e) {
    console.log(e.data);
  }
})();
