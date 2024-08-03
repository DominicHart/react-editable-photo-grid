import { ReactElement } from "react";

export interface PhotoIdAndRowKey {
  id: string;
  rowKey: number;
}

export interface ButtonArrows {
  up: string;
  down: string;
  left: string;
  right: string
}

export interface GalleryButtonArrows {
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
export interface PhotoRows {
  [key: number]: PhotoItem[];
}
export interface PhotoGridProps {
  photos: PhotoItem[];
  rows: PhotoRows;
  updateRows: (rows: PhotoRows) => void;
  changes: number;
  increaseChanges: () => void;
  isEditing: boolean;
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
  onPhotoClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  imageSrcPrefix: string;
  imageSrcProperty: imgSrcProperty;
  photoMenu: ReactElement | undefined,
  useGallery?: boolean
  gallerySrcProperty?: imgSrcProperty;
  onGallerySwipe?: (photo: PhotoItem) => void;
  buttonArrows?: ButtonArrows;
  galleryButtonArrows?: GalleryButtonArrows;
  galleryType: string
}

export interface PhotoControlsProps {
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
export interface RowControlsProps {
  rowKey: string | number;
  moveRowUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  moveRowDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rowCount: number;
  buttonArrows?: ButtonArrows;
}