import peopleFindByUsername from "./api/people/findByUsername.mjs";
import getPhotos from "./api/people/getPhotos.mjs";
import { DEST_DIR } from "./constants.mjs";
import download from "./download.mjs";

function isString(val) {
  return typeof val === "string" || val instanceof String;
}

async function main() {
  const { FLICKR_USERNAME, FLICKR_REQUEST_OPTIONS } = process.env;

  if (!isString(FLICKR_USERNAME)) {
    throw new Error("The username is required.");
  }

  const user = await peopleFindByUsername(FLICKR_USERNAME);
  const photos = await getPhotos({
    user_id: user.id,
    ...(isString(FLICKR_REQUEST_OPTIONS)
      ? JSON.parse(FLICKR_REQUEST_OPTIONS)
      : {})
  });

  return photos.photo.map(({ url_o }) => download(url_o, DEST_DIR));
}

main().catch(err => {
  if (err) {
    console.error(err);
  }
});
