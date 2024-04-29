import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import dotenv from "dotenv";

dotenv.config();

const { AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY, AWS_ACCESS_KEY_ID } =
  process.env;

const client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: AWS_ACCESS_KEY ?? "",
  },
  region: process.env.AWS_REGION,
});

const BUCKET_HOSTNAME = `${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;
const BUCKET_IMAGES_PATH = "images";

export const isBucketUrl = (url: URL): boolean => {
  return url.hostname === BUCKET_HOSTNAME;
};

export const getBucketImageUrl = (key: string): URL => {
  return new URL(`https://${BUCKET_HOSTNAME}/${key}`);
};

export const uploadToS3 = async (
  path: string,
  body: Buffer | ReadableStream
): Promise<URL> => {
  const key = BUCKET_IMAGES_PATH + "/" + path;
  const upload = new Upload({
    client,
    params: {
      ACL: "public-read",
      Bucket: AWS_BUCKET,
      Key: key,
      Body: body,
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
  });
  await upload.done();
  return getBucketImageUrl(key);
};
