import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import dotenv from "dotenv";

dotenv.config();

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_ACCESS_KEY ?? "",
  },
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (path: string, stream: ReadableStream) => {
  const upload = new Upload({
    client,
    params: {
      ACL: "public-read",
      Bucket: process.env.AWS_BUCKET,
      Key: "/images/" + path,
      Body: stream,
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
  });
  const output = await upload.done();
  return output;
};
