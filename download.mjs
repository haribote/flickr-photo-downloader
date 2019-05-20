import axios from "axios";
import * as fs from "fs";
import * as path from "path";

function mkdir(pathname) {
  return new Promise((resolve, reject) => {
    fs.mkdir(pathname, { recursive: true }, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve(pathname);
    });
  });
}

export default async function download(url, dir = ".") {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  const _url = new URL(url);
  const paths = _url.pathname.replace(/^\//, "").split("/");
  const filename = paths.pop();
  const pathname = paths.length > 0 ? `${dir}/${paths.join("/")}` : dir;
  const dist = path.resolve("./", `${pathname}/${filename}`);
  const buffer = new Buffer.from(res.data);

  await mkdir(pathname);
  fs.writeFileSync(dist, buffer, "binary");

  console.log(`${url} -> ${dist}`);

  return buffer;
}
