const cheerio = require("cheerio");
const rp = require("request-promise");

const previewUrl = async (urlToPreview: string) => {
  const options = {
    uri: urlToPreview,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
    },
    transform: function (body: any) {
      return cheerio.load(body);
    },
  };
  try {
    const $: any = await rp(options);
    const title = $('meta[property="og:title"]').attr("content");
    const type = $('meta[property="og:type"]').attr("content");
    const url = $('meta[property="og:url"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");
    const description = $('meta[property="og:description"]').attr("content");
    const siteName = $('meta[property="og:site_name"]').attr("content");
    return {
      title,
      type,
      url,
      image,
      description,
      siteName,
    };
  } catch (e) {
    console.log("There was an error", e);
    return null;
  }
};

export default previewUrl;
