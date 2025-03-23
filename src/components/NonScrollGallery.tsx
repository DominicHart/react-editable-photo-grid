import React, { useEffect, useState, TouchEvent } from 'react'
import { imgSrcProperty, GalleryButtonArrows, PhotoItem } from '../types';
import { disableRightClick, getImageSrcProperty, photoHasDetails } from "../utils";

type GalleryProps = {
  photos: PhotoItem[],
  activeKey: number,
  setActiveKey: (key: number) => void,
  imageSrcPrefix: string;
  imageSrcProperty: imgSrcProperty;
  buttonArrows?: GalleryButtonArrows;
  onGallerySwipe?: (photo: PhotoItem) => void;
}

const NonScrollGallery = (props: GalleryProps) => {
  const [touchPosition, setTouchPosition] = useState<number | null>(null),
    [visible, setVisible] = useState<boolean>(false);

  const getSrcProperty = (photo: PhotoItem): string => {
    const property = props.imageSrcProperty as string;
    return getImageSrcProperty(photo, property);
  }

  const showGallery = () => {
    setVisible(true);
  }

  const handleSwipe = () => {
    if (props.onGallerySwipe) {
      const photoKey = props.activeKey,
        photo: PhotoItem = props.photos[photoKey];

      if (photo) {
        props.onGallerySwipe(photo);
      }
    }
  }

  const shouldRenderImage = (index: number) => {
    const key = props.activeKey;
    let validIndexes = [key];

    if (key > 0) {
      validIndexes.push(key - 1);
    }

    if (key < props.photos.length - 1) {
      validIndexes.push(key + 1);
    }

    return validIndexes.includes(index);
  }

  const prevItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.activeKey > 0) {
      props.setActiveKey(props.activeKey - 1);
      handleSwipe();
    }
  }

  const nextItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.activeKey < props.photos.length - 1) {
      props.setActiveKey(props.activeKey + 1);
      handleSwipe();
    }
  }

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      if (props.activeKey < props.photos.length - 1) {
        props.setActiveKey(props.activeKey + 1);
      }
    } else if (e.keyCode === 37) {
      if (props.activeKey > 0) {
        props.setActiveKey(props.activeKey - 1);
      }
    }
    handleSwipe();
  }

  const hideGallery = () => {
    setVisible(false);
    props.setActiveKey(-1);
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchPosition === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX,
      diff = touchPosition - currentTouch;

    if (diff > 5) {
      if (props.activeKey < props.photos.length - 1) {
        props.setActiveKey(props.activeKey + 1);
      }
    }

    if (diff < -5) {
      if (props.activeKey > 0) {
        props.setActiveKey(props.activeKey - 1);
      }
    }

    handleSwipe();
    setTouchPosition(null);
  }

  useEffect(() => {
    if (props.activeKey > -1) {
      if (visible === false) {
        showGallery()
      }
    }

    document.addEventListener('keydown', keydownHandler);

    return function cleanup() {
      document.removeEventListener('keydown', keydownHandler);
    };

  }, [props.activeKey])

  return (
    <div
      className="custom__gallery"
      style={{ display: visible === true ? 'block' : 'none' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="clearfix">
        <button className="close__gallery" onClick={hideGallery} type="button">&times;</button>
      </div>
      <div className="custom__gallery__container">
        {props.activeKey > 0 &&
          <button
            onClick={prevItem}
            className="previous__item"
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.prev : '&#8592' }}
          />
        }
        <div className="custom__gallery__images">
          {props.photos.length &&
            props.photos.map((photo, i) =>
              <div key={`${i}`} className={props.activeKey == i ? "custom__gallery__item active" : "custom__gallery__item"}>
                <img
                  src={shouldRenderImage(i) ? `${props.imageSrcPrefix}${getSrcProperty(photo)}` : ''}
                  alt="gallery item"
                  onContextMenu={disableRightClick}
                />
                {photoHasDetails(photo) === true && (
                  <div className="custom__gallery__photo__overlay">
                    {photo.name != undefined && photo.name !== '' && (
                      <h4>{photo.name}</h4>
                    )}
                    {photo.description != undefined && photo.description !== '' && (
                      <p>{photo.description}</p>
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
        {props.activeKey < props.photos.length - 1 &&
          <button
            onClick={nextItem}
            className="next__item"
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.next : '&#8594' }}
          />
        }
      </div>
    </div>
  )
}

export default NonScrollGallery;