import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucketName = 'travel-easy-dev';

export default async function handle(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { key } = req.body;

  if (!key) {
    res.status(400).json({ error: 'Missing image key' });
    return;
  }

  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  try {
    await client.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    }));
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image', details: error.message });
  }
}
