import axios from "axios";
import fs from "fs";
import { uploadToS3 } from "~/lib/s3";
const main = async () => {
  const response = await axios.get("https://picsum.photos/200/300", {
    responseType: "stream",
  });
  uploadToS3(
    "/lorempixel/img-" + new Date().toISOString() + ".jpg",
    response.data
  );
  // await new Promise((res, rej) =>
  //   response.data
  //     .pipe(fs.createWriteStream("./img.jpg"))
  //     .on("error", rej)
  //     .once("close", () => res())
  // );
};
main();
