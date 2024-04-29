import axios from "axios";
import sharp from "sharp";
import { getBucketImageUrl, isBucketUrl, uploadToS3 } from "~/lib/s3";
import { UpdatePayload } from "./edit-exercise.model";
import { Exercise } from "~/database/schema";
import { updateExercise } from "~/database/db-client";

const createThumbnail = async (buffer: Buffer): Promise<Buffer> => {
  return sharp(buffer)
    .resize({
      width: 75,
      height: 75,
      fit: "cover",
    })
    .toBuffer();
};

const storeImage = async (imageUrl: URL): Promise<[URL, URL]> => {
  const { hostname, pathname } = imageUrl;
  const storedImagePath = hostname + pathname;
  const thumbnailPath = "thumbnails/" + storedImagePath;
  if (isBucketUrl(imageUrl))
    return [imageUrl, getBucketImageUrl(thumbnailPath)];
  const response = await axios.get(imageUrl.toString(), {
    responseType: "arraybuffer",
  });
  const thumbnail = await createThumbnail(response.data);
  return Promise.all([
    uploadToS3(storedImagePath, response.data),
    uploadToS3(thumbnailPath, thumbnail),
  ]);
};

export const updateExerciseAction = async (
  payload: UpdatePayload,
): Promise<Exercise> => {
  const { intent, id, imageUrl, ...data } = payload;
  const [storedImageUrl, thumbnailUrl] = imageUrl
    ? await storeImage(imageUrl)
    : [];
  const updateData = {
    ...data,
    imageUrl: storedImageUrl?.toString(),
    thumbnailUrl: thumbnailUrl?.toString(),
  };
  const { quiz } = await updateExercise(id, updateData);
  return quiz;
};
