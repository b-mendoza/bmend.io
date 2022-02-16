import type { IGetPlaiceholderReturn } from 'plaiceholder';

export interface WithError {
  message: string;
}

export interface WithData {
  dataUrl: string;
  img: IGetPlaiceholderReturn['img'];
}

export type GetImageTransformationsResponse = WithError | WithData;
