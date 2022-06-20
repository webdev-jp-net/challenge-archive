import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../libs/client"

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.query.secret !== process.env.MICRO_CMS_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const id = req.query.id.toString();
  const draftKey = req.query.draftKey.toString();
  const post = await client.get({
    endpoint: "challenge",
    contentId: id,
    queries: {draftKey}
  });

  if (!post) {
    return res.status(401).json({ message: "Invalid contentId" });
  }

  res.setPreviewData({ id, draftKey });
  res.writeHead(307, { Location: `/draft/${post.id}` });
  res.end('Preview mode enabled');
};

export default preview;