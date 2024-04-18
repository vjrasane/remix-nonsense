import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
const client = new S3Client({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
  region: "",
});

export const uploadToS3 = async (stream: ReadableStream) => {
  const upload = new Upload({
    client,
    params: {
      ACL: "public-read",
      Bucket: "",
      Key: "",
      Body: stream,
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
  });
  const output = await upload.done();
  return output;
};
