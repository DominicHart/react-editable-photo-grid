import { ReactElement } from "react";

export interface PhotoIdAndRowKey {
  id: string;
  rowKey: number;
}

export interface PhotoItem {
  id: string;
  column: number;
  image_path: string;
  thumbnail_path: string;
  carousel_key: number;
  width: number;
  height: number;
}

export interface PhotoRows {
  [key: number]: PhotoItem[];
}

export interface PhotoGridProps {
  rows: PhotoRows;
  updateRows: (rows: PhotoRows) => void;
  changes: number;
  increaseChanges: () => void;
  isEditing: boolean;
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
  photoMenu: ReactElement | undefined
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
}
export interface RowControlsProps {
  rowKey: string | number;
  moveRowUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  moveRowDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rowCount: number
}