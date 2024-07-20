import React, { useEffect, useState, TouchEvent } from 'react'
import { PhotoRows, imgSrcProperty, ButtonArrows } from '../types';
import { getImageSrcProperty } from "../utils";

type GalleryProps = {
  data: PhotoRows,
  activeKey: number,
  highestKey: number,
  setActiveKey: (key: number) => void,
  imageSrcPrefix: string;
  imageSrcProperty: imgSrcProperty;
  buttonArrows?: ButtonArrows;
}

const Gallery = (props: GalleryProps) => {
  const [touchPosition, setTouchPosition] = useState<number>(0),
    [activeImageUrl, setActiveImageUrl] = useState<string>(''),
    [visible, setVisible] = useState<boolean>(false);

  const setActiveImage = () => {
    const property = props.imageSrcProperty as string,
      photos = { ...props.data };

    for (const [rowKey, row] of Object.entries(photos)) {
      for (const photo of row) {
        if (photo.gallery_key == props.activeKey) {
          setActiveImageUrl(getImageSrcProperty(photo, property));
          return;
        }
      }
    }
  }

  const showGallery = () => {
    setVisible(true);
  }

  const prevItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.activeKey > 1) {
      const prevKey = props.activeKey - 1;
      props.setActiveKey(prevKey);
      setActiveImage()
    }
  }

  const nextItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.activeKey < props.highestKey) {
      const nextKey = props.activeKey + 1;
      props.setActiveKey(nextKey);
      setActiveImage()
    }
  }

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      if (props.activeKey < props.highestKey) {
        props.setActiveKey(props.activeKey + 1);
        setActiveImage()
      }
    } else if (e.keyCode === 37) {
      if (props.activeKey > 1) {
        props.setActiveKey(props.activeKey - 1);
        setActiveImage()
      }
    }

  }

  const hideGallery = () => {
    setVisible(false);
    props.setActiveKey(-1);
  }

  const disableRightClick = () => {
    return false;
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX,
      diff = touchDown - currentTouch;

    if (diff > 5) {
      if (props.activeKey < props.highestKey) {
        props.setActiveKey(props.activeKey + 1);
      }
    }

    if (diff < -5) {
      if (props.activeKey > 1) {
        props.setActiveKey(props.activeKey - 1);
      }
    }

    setTouchPosition(0);
  }

  useEffect(() => {
    if (props.activeKey > -1) {
      setActiveImage()

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
    <div className="custom__gallery" style={{ display: visible === true ? 'block' : 'none' }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <div className="clearfix">
        <button className="close__gallery" onClick={hideGallery} type="button">&times;</button>
      </div>
      <div className="custom__gallery__container">
        {props.activeKey > 1 &&
          <button
            onClick={prevItem}
            className="previous__item"
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.left : '&#8592' }}
          />
        }
        <div className="custom__gallery__images">
          {Object.keys(props.data).length ?
            <div className="custom__gallery__item active">
              <img
                src={`${props.imageSrcPrefix}${activeImageUrl}`}
                alt="gallery item"
                onContextMenu={disableRightClick}
              />
            </div> : null}
        </div>
        {props.activeKey < props.highestKey &&
          <button
            onClick={nextItem}
            className="next__item"
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.right : '&#8594' }}
          />
        }
      </div>
    </div>
  )
}

export default Gallery;