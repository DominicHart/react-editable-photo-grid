import React, { cloneElement, useState } from 'react';
import { PhotoGridProps, PhotoItem, imgSrcProperty } from './types';
import { sortRow, movePhotoLeft, movePhotoUp, movePhotoDown, movePhotoRight, moveRowUp, moveRowDown, getImageSrcProperty } from "./utils";
import RowControls from './components/RowControls';
import PhotoControls from './components/PhotoControls';
import Gallery from './components/Gallery';
import './styles.css';

const PhotoGrid = (props: PhotoGridProps) => {
  const [activeGalleryKey, setActiveGalleryKey] = useState<number>(-1);

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

  const getSrcProperty = (photo: PhotoItem): string => {
    const property = props.imageSrcProperty as string;
    return getImageSrcProperty(photo, property);
  }

  const getGalleryKey = (id: string) : number => {
    return props.photos.findIndex((photoItem: PhotoItem) => photoItem.id && photoItem.id == id);
  }

  const launchGallery = (e: React.MouseEvent<HTMLImageElement>) => {
    const photoId = e.currentTarget.dataset.id;
    if (!photoId) {
      throw new TypeError('Photo key missing');
    }
    const imageKey = getGalleryKey(photoId);
    if (imageKey > -1) {
      setActiveGalleryKey(imageKey);
    }
  }

  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    <div>
      {props.useGallery &&
        <Gallery
          photos={props.photos}
          activeKey={activeGalleryKey}
          setActiveKey={setActiveGalleryKey}
          imageSrcPrefix={props.imageSrcPrefix}
          imageSrcProperty={props.gallerySrcProperty ? props.gallerySrcProperty : ('image_path' as imgSrcProperty)}
          buttonArrows={props.galleryButtonArrows}
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
                  buttonArrows={props.buttonArrows}
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
                    src={`${props.imageSrcPrefix}${getSrcProperty(photo)}`}
                    alt={photo.thumbnail_path}
                    onClick={props.useGallery ? launchGallery : undefined}
                    className={props.useGallery ? "cursor-pointer" : 'cursor-default'}
                  />
                  {props.isEditing &&
                    <>
                      <p className="photo__position">R: {row[0]} | C: {photo.column}</p>
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
                        buttonArrows={props.buttonArrows}
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