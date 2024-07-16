import { PhotoItem, PhotoRows, PhotoIdAndRowKey, PhotoGridProps } from './types';
import React from 'react';

/**
 * Sorts the photos in a row by column number
 * @param row 
 */
export const sortRow = (row: PhotoItem[]) => {
  return row.sort((a, b) => Math.floor(a.column) - Math.floor(b.column))
}

/**
 * Get a photo from a row via id
 * @param row 
 * @param id 
 */
const getPhotoForId = (row: PhotoItem[], id: string): PhotoItem => {
  const photoResult = row.find(photo => photo.id === id);

  if (photoResult === undefined) {
    throw new TypeError('No photo was found in this row for that id');
  }

  return photoResult;
}

/**
 * Get a photo from a row by column number
 * @param row 
 * @param column 
 */
const getPhotoForColumn = (row: PhotoItem[], column: number): PhotoItem => {
  const photoResult = row.find(photo => photo.column === column);

  if (photoResult === undefined) {
    throw new TypeError('No photo was found in this row for that column');
  }

  return photoResult;
}

/**
 * Deletes a photo from a row by column number
 * @param row 
 * @param column 
 */
const deletePhotoFromRowByColumn = (row: PhotoItem[], column: number): PhotoItem[] => {
  return row.filter((photo: PhotoItem) => photo.column !== column);
}

/**
 * Adds a photo to a row
 * @param row 
 * @param photo 
 * @param column 
 */
const addPhotoToRow = (row: PhotoItem[] = [], photo: PhotoItem, column: number): PhotoItem[] => {
  photo.column = column;
  row.push(photo);
  return row;
}

/**
 * Swaps two photos around in the row
 * @param row 
 * @param firstPhoto 
 * @param secondPhoto 
 */
const swapPhotosAround = (
  row: PhotoItem[],
  firstPhoto: PhotoItem,
  secondPhoto: PhotoItem): PhotoItem[] => {
  const firstColumn = firstPhoto.column,
    secondColumn = secondPhoto.column;

  row = deletePhotoFromRowByColumn(row, firstColumn);
  row = deletePhotoFromRowByColumn(row, secondColumn);
  row = addPhotoToRow(row, firstPhoto, secondColumn);
  row = addPhotoToRow(row, secondPhoto, firstColumn);

  return row;
}

/**
 * Casts a the rowKey to a number if necessary
 * @param rowKey 
 */
export const castRowKey = (rowKey: string | number): number => {
  if (typeof rowKey == 'string') {
    rowKey = parseInt(rowKey);
  }

  return rowKey;
}

/**
 * Extract the row key and photo id from the clicked element
 * @param e 
 */
const getPhotoIdAndRowKey = (e: React.MouseEvent<HTMLButtonElement>): PhotoIdAndRowKey => {
  const button = e.currentTarget as HTMLButtonElement,
    id = button.dataset.id,
    rowKey = button.dataset.row;

  if (!id || !rowKey) {
    throw new TypeError('id or row key missing from photo control');
  }

  return {
    id: id,
    rowKey: parseInt(rowKey)
  }
}

/**
 * Moves a photo one column to the left
 * @param e 
 * @param props 
 */
export const movePhotoLeft = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();

  const { id, rowKey } = getPhotoIdAndRowKey(e);

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]);

  const thisPhoto = getPhotoForId(thisRow, id);

  if (thisPhoto.column === 1) {
    return;
  }

  const beforePhoto = getPhotoForColumn(thisRow, thisPhoto.column - 1);
  thisRow = swapPhotosAround(thisRow, beforePhoto, thisPhoto);

  delete rowsCopy[rowKey];
  rowsCopy[rowKey] = thisRow;

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

/**
 * Move a photo one column to the right
 * @param e 
 * @param props 
 */
export const movePhotoRight = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();

  const { id, rowKey } = getPhotoIdAndRowKey(e);

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]);

  const thisPhoto = getPhotoForId(thisRow, id);

  if (thisPhoto.column === thisRow.length) {
    return;
  }

  const afterPhoto = getPhotoForColumn(thisRow, thisPhoto.column + 1);
  thisRow = swapPhotosAround(thisRow, thisPhoto, afterPhoto);

  delete rowsCopy[rowKey];
  rowsCopy[rowKey] = thisRow;

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

/**
 * All photos in the row move back a column (to the left)
 * @param row 
 * @param start 
 * @param end 
 */
const shufflePhotosBackOneColumn = (row: PhotoItem[], start: number, end: number): PhotoItem[] => {
  for (let x = start; x <= end; x++) {
    const selectedPhoto = getPhotoForColumn(row, x);
    row = deletePhotoFromRowByColumn(row, x);
    row = addPhotoToRow(row, selectedPhoto, selectedPhoto.column - 1);
  }

  return row;
}

/**
 * All the photos in the the row move forward a column (to the right)
 * @param row 
 * @param start 
 */
const shufflePhotosForwardOneColumn = (row: PhotoItem[], start: number): PhotoItem[] => {
  for (let x = start; x > 0; x--) {
    const selectedPhoto = getPhotoForColumn(row, x);
    row = deletePhotoFromRowByColumn(row, x);
    row = addPhotoToRow(row, selectedPhoto, selectedPhoto.column + 1);
  }

  return row;
}

/**
 * Moves a photo to the end of the previous row
 * @param e 
 * @param props 
 */
export const movePhotoUp = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();
  const { id, rowKey } = getPhotoIdAndRowKey(e);

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]),
    previousRowKey = rowKey - 1,
    previousRow: PhotoItem[] = [];

  if (rowsCopy[previousRowKey] != undefined) {
    previousRow = sortRow(rowsCopy[previousRowKey]);
  }

  const thisPhoto = getPhotoForId(thisRow, id);

  let start = thisPhoto.column + 1,
    end = thisRow.length;

  thisRow = deletePhotoFromRowByColumn(thisRow, thisPhoto.column);
  delete rowsCopy[rowKey];

  if (thisRow.length) {
    shufflePhotosBackOneColumn(thisRow, start, end);
    rowsCopy[rowKey] = thisRow;
  }

  previousRow = addPhotoToRow(previousRow, thisPhoto, previousRow.length + 1);
  delete rowsCopy[previousRowKey];
  rowsCopy[previousRowKey] = previousRow;

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

/**
 * Moves a photo to the beginning of the next row
 * @param e 
 * @param props 
 */
export const movePhotoDown = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();
  const { id, rowKey } = getPhotoIdAndRowKey(e);

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]),
    nextRowKey = rowKey + 1;

  const thisPhoto = getPhotoForId(thisRow, id);

  let start = thisPhoto.column + 1,
    end = thisRow.length;

  thisRow = deletePhotoFromRowByColumn(thisRow, thisPhoto.column);

  delete rowsCopy[rowKey];

  if (thisRow.length) {
    thisRow = shufflePhotosBackOneColumn(thisRow, start, end);
  }

  let nextRow = null;

  if (rowsCopy[nextRowKey] == undefined) {
    thisPhoto.column = 1;
    nextRow = [thisPhoto];
  } else {
    nextRow = sortRow(rowsCopy[nextRowKey]);
    nextRow = shufflePhotosForwardOneColumn(nextRow, nextRow.length);
    nextRow = addPhotoToRow(nextRow, thisPhoto, 1);
    delete rowsCopy[nextRowKey];
  }

  rowsCopy[nextRowKey] = nextRow;

  if (thisRow.length) {
    rowsCopy[rowKey] = thisRow;
  }

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

/**
 * Swaps the row order
 * @param rows 
 * @param firstRow 
 * @param firstRowKey 
 * @param secondRow 
 * @param secondRowKey 
 */
const swapRows = (
  rows: PhotoRows,
  firstRow: PhotoItem[],
  firstRowKey: number,
  secondRow: PhotoItem[],
  secondRowKey: number
): PhotoRows => {
  delete rows[secondRowKey];
  delete rows[firstRowKey];
  rows[secondRowKey] = firstRow;
  rows[firstRowKey] = secondRow;

  return rows;
}

/**
 * Move a row up
 * @param e 
 * @param props 
 */
export const moveRowUp = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();
  const target = e.currentTarget as HTMLButtonElement;
  let rowKey = target.dataset.row;

  if (!rowKey) {
    throw new TypeError('row missing from row control');
  }

  const rowIndex: number = parseInt(rowKey),
    previousRowKey = rowIndex - 1;

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowIndex]),
    previousRow = sortRow(rowsCopy[previousRowKey]);

  rowsCopy = swapRows(rowsCopy, thisRow, rowIndex, previousRow, previousRowKey);

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

/**
 * Moves a row down
 * @param e 
 * @param props 
 */
export const moveRowDown = (e: React.MouseEvent<HTMLButtonElement>, props: PhotoGridProps) => {
  e.preventDefault();
  const target = e.currentTarget as HTMLButtonElement;
  let rowKey = target.dataset.row;

  if (!rowKey) {
    throw new TypeError('row missing from row control');
  }

  const rowIndex: number = parseInt(rowKey),
    nextRowKey = rowIndex + 1;

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowIndex]),
    nextRow = sortRow(rowsCopy[nextRowKey]);

  rowsCopy = swapRows(rowsCopy, thisRow, rowIndex, nextRow, nextRowKey);

  props.updateRows(rowsCopy);
  props.increaseChanges();
}