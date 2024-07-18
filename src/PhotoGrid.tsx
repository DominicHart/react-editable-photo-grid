import React, { cloneElement } from 'react';
import { PhotoGridProps } from './types';
import { sortRow, movePhotoLeft, movePhotoUp, movePhotoDown, movePhotoRight, moveRowUp, moveRowDown } from "./utils";
import RowControls from './components/RowControls';
import PhotoControls from './components/PhotoControls';
import './styles.css';

const PhotoGrid = (props: PhotoGridProps) => {
  const handleMovePhotoUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    movePhotoUp(e, props);
  }

  const handleMovePhotoDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    movePhotoDown(e, props);
  }

  const handleMovePhotoLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    movePhotoLeft(e, props);
  }

  const handleMovePhotoRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    movePhotoRight(e, props);
  }

  const handleMoveRowUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    moveRowUp(e, props);
  }

  const handleMoveRowDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    moveRowDown(e, props);
  }

  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    <div className="photogrid">
      {Object.entries(props.rows).map((row, i) =>
        row[1].length &&
        <div 
          key={'row-' + i} 
          className={props.isEditing ? "photogrid--photo__row editing" : "photogrid--photo__row"}
        >
          <>
            {props.isEditing &&
              <RowControls
                rowKey={row[0]}
                moveRowUp={handleMoveRowUp}
                moveRowDown={handleMoveRowDown}
                rowCount={Object.keys(props.rows).length}
              />
            }
            {sortRow(row[1]).map((photo, i2) =>
              <div 
                key={'photo-' + i + i2} 
                className="photogrid--photo__column"
              >
                <img
                  width={photo.width}
                  height={photo.height}
                  data-id={photo.id}
                  src={props.imageUrlPrefix + photo.thumbnail_path}
                  alt={photo.thumbnail_path}
                />
                {props.isEditing &&
                  <>
                    {props.photoMenu ?
                      cloneElement(props.photoMenu, {
                        photo: photo
                      })
                      : null}
                    <PhotoControls
                      rowKey={row[0]}
                      photo={photo}
                      movePhotoDown={handleMovePhotoDown}
                      movePhotoLeft={handleMovePhotoLeft}
                      movePhotoUp={handleMovePhotoUp}
                      movePhotoRight={handleMovePhotoRight}
                      rowCount={Object.keys(props.rows).length}
                      photoCount={row[1].length}
                    />
                  </>
                }
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;