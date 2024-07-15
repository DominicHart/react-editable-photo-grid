import React, { cloneElement  } from 'react';
import { PhotoGridProps } from './types';
import { sortRow, movePhotoLeft, movePhotoUp, movePhotoDown, movePhotoRight, moveRowUp, moveRowDown } from "./utils";
import RowControls from './components/RowControls';
import PhotoControls from './components/PhotoControls';

const PhotoGrid: React.FC = (props: PhotoGridProps) => {
  const handleMovePhotoUp = (e: any) => {
    movePhotoUp(e, props);
  }

  const handleMovePhotoDown = (e: any) => {
    movePhotoDown(e, props);
  }

  const handleMovePhotoLeft = (e: any) => {
    movePhotoLeft(e, props);
  }

  const handleMovePhotoRight = (e: any) => {
    movePhotoRight(e, props);
  }

  const handleMoveRowUp = (e: any) => {
    moveRowUp(e, props);
  }

  const handleMoveRowDown = (e: any) => {
    moveRowDown(e, props);
  }

  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    <div className="photogrid">
      {Object.entries(props.rows).map((row, i) =>
        row[1].length &&
        <div key={'row-' + i} className={props.isEditing ? "photo__row editing" : "photo__row"}>
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
              <div key={'photo-' + i + i2} className="photo__column relative align-middle block relative m-0.5">
                <img
                  width={photo.width}
                  height={photo.height}
                  data-id={photo.id}
                  src={"/api/photos/" + photo.thumbnail_path}
                  alt={photo.thumbnail_path}
                  className="block md:inline-block max-w-full max-h-[700px] h-auto m-0 select-none"
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