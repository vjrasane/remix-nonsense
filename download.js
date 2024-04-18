import axios from "axios";
import fs from "fs";
const main = async () => {
  const response = await axios.get("https://picsum.photos/200/300", {
    responseType: "stream",
  });
  await new Promise((res, rej) =>
    response.data
      .pipe(fs.createWriteStream("./img.jpg"))
      .on("error", rej)
      .once("close", () => res())
  );
};
main();
