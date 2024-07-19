import React, { cloneElement, useState } from 'react';
import { PhotoGridProps, PhotoItem } from './types';
import { sortRow, movePhotoLeft, movePhotoUp, movePhotoDown, movePhotoRight, moveRowUp, moveRowDown } from "./utils";
import RowControls from './components/RowControls';
import PhotoControls from './components/PhotoControls';
import Gallery from './components/Gallery';
import './styles.css';

const PhotoGrid = (props: PhotoGridProps) => {
  const [activeGalleryKey, setActiveGalleryKey] = useState<number>(-1);
  let highestGalleryKey = props.highestGalleryKey;

  if (!highestGalleryKey) {
    highestGalleryKey = 0;
  }

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

  const getImageSrcProperty = (photo: PhotoItem): string => {
    const property = props.imageSrcProperty as string;
    switch (property) {
      case 'id':
        return photo.id;
      case 'thumbnail_path':
        return photo.thumbnail_path;
      case 'image_path':
        return photo.image_path;
    }

    return photo.thumbnail_path;
  }

  const launchGallery = (e: React.MouseEvent<HTMLImageElement>) => {
    const imageKey = e.currentTarget.dataset.key;
    if (!imageKey) {
      throw new TypeError('Photo key missing');
    }
    setActiveGalleryKey(parseInt(imageKey));
  }

  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    <div>
      {props.useGallery &&
        <Gallery
          data={props.rows}
          activeKey={activeGalleryKey}
          highestKey={highestGalleryKey}
          setActiveKey={setActiveGalleryKey}
        />
      }
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
                    src={`${props.imageSrcPrefix}${getImageSrcProperty(photo)}`}
                    alt={photo.thumbnail_path}
                    onClick={props.useGallery ? launchGallery : undefined}
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
    </div>
  );
};

export default PhotoGrid;