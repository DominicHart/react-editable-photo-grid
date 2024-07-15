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
  rowKey: string;
  photo: PhotoItem;
  rowCount: number,
  photoCount: number,
  movePhotoLeft: (e: any) => void;
  movePhotoUp: (e: any) => void;
  movePhotoDown: (e: any) => void;
  movePhotoRight: (e: any) => void;
}
export interface RowControlsProps {
  rowKey: string | number;
  moveRowUp: (e: any) => void;
  moveRowDown: (e: any) => void;
  rowCount: number
}