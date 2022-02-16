import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { getPlaiceholder } from 'plaiceholder';

import type { GetImageTransformationsResponse } from 'types/api/image';

const getImageTransformations = nc<
  NextApiRequest,
  NextApiResponse<GetImageTransformationsResponse>
>({
  onError: (error: Error, _, res) => {
    res.status(400).json({ message: error.message });
  },
}).get(async (req, res) => {
  const { url } = req.query;

  if (typeof url !== 'string') {
    throw new Error('You did not provide a valid URL 🙁');
  }

  const { base64, img } = await getPlaiceholder(url);

  res.setHeader('Cache-Control', `public, max-age=${3.156e7}, immutable`);

  res.status(200).json({ dataUrl: base64, img });
});

export default getImageTransformations;
