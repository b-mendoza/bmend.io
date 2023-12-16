import { getPlaiceholder } from 'plaiceholder';

export const getLQIP = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const placeholder = await getPlaiceholder(buffer, {
    format: ['webp'],
    size: 8,
  });

  return placeholder.base64;
};
