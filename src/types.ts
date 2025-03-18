import React, { ReactElement } from "react";

export type PhotoIdAndRowKey = {
  id: string;
  rowKey: number;
}

export type ButtonArrows = {
  up: string;
  down: string;
  left: string;
  right: string
}

export type GalleryButtonArrows = {
  prev: string;
  next: string;
}

export interface PhotoItem {
  id: string;
  column: number;
  row: number;
  image_path: string;
  thumbnail_path: string;
  width: number;
  height: number;
  name?: string;
  description?: string;
}

export enum imgSrcProperty {
  id = 'id',
  thumbnail_path = 'thumbnail_path',
  image_path = 'image_path'
}

export type PhotoRows = {
  [key: number]: PhotoItem[];
}

export type PhotoGridProps = {
  photos: PhotoItem[];
  rows: PhotoRows;
  changes: number;
  isEditing: boolean;
  selectedPhotos: Array<string>;
  imageSrcPrefix: string;
  imageSrcProperty: imgSrcProperty;
  photoMenu: ReactElement | undefined;
  photoActions: ReactElement| undefined;
  galleryType: string;
  useGallery?: boolean;
  gallerySrcProperty?: imgSrcProperty;
  buttonArrows?: ButtonArrows;
  galleryButtonArrows?: GalleryButtonArrows;
  updateRows: (rows: PhotoRows) => void;
  increaseChanges: () => void;
  onGallerySwipe?: (photo: PhotoItem) => void;
  updateSelectedPhotos: (ids: Array<string>) => void;
  onPhotoClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export type PhotoControlsProps = {
  rowKey: string | number;
  photo: PhotoItem;
  rowCount: number,
  photoCount: number,
  movePhotoLeft: (e: React.MouseEvent<HTMLButtonElement>) => void;
  movePhotoUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  movePhotoDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  movePhotoRight: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonArrows?: ButtonArrows;
}

export type RowControlsProps = {
  rowKey: string | number;
  moveRowUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  moveRowDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rowCount: number;
  buttonArrows?: ButtonArrows;
}