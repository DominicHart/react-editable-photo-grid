import React, { useState, useEffect, useRef, useCallback } from 'react';
import { imgSrcProperty, GalleryButtonArrows, PhotoItem } from '../types';
import { photoHasDetails } from "../utils";
import debounce from 'lodash.debounce';

type Props = {
  photos: PhotoItem[],
  activeKey: number,
  setActiveKey: (key: number) => void,
  imageSrcPrefix: string;
  imageSrcProperty: imgSrcProperty;
  onGallerySwipe?: (photo: PhotoItem) => void;
  buttonArrows?: GalleryButtonArrows;
};

const ScrollGallery: React.FC<Props> = ({ photos, imageSrcPrefix, imageSrcProperty, onGallerySwipe, activeKey, setActiveKey, buttonArrows }) => {
  const [visible, setVisible] = useState<boolean>(false),
    scrollContainer = useRef<HTMLDivElement | null>(null),
    imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const getImageSrcProperty = (photo: PhotoItem, property: string): string => {
    switch (property) {
      case 'id':
        return photo.id;
      case 'thumbnail_path':
        return photo.thumbnail_path;
      case 'image_path':
        return photo.image_path;
    }

    return photo.image_path;
  }

  const handleSwipe = () => {
    if (onGallerySwipe) {
      const photoKey = activeKey,
        photo: PhotoItem = photos[photoKey];

      if (photo) {
        onGallerySwipe(photo);
      }
    }
  }

  const hideGallery = () => {
    setVisible(false);
    setActiveKey(-1);
  }

  const jumpToImage = useCallback(
    debounce((index: number) => {
      const imgElement = imgRefs.current[index];
      const containerElement = scrollContainer.current;

      if (imgElement && containerElement) {
        const imgRect = imgElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();

        const scrollLeft = imgRect.left - containerRect.left + containerElement.scrollLeft;
        containerElement.scrollLeft = scrollLeft;
      }
    }, 50),
    []
  );

  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  }

  const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (scrollContainer.current != undefined) {
      scrollContainer.current.scrollBy({
        top: 0,
        left: -1,
        behavior: 'smooth'
      });
    }
  }

  const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (scrollContainer.current != undefined) {
      scrollContainer.current.scrollBy({
        top: 0,
        left: 800,
        behavior: 'smooth'
      });
    }
  }

  const loadImages = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const imgElement = entry.target as HTMLImageElement,
          src = imgElement.getAttribute('data-src'),
          index = imgElement.getAttribute('data-index');

        if (src) {
          imgElement.src = src;
        }

        if (index) {
          const prevImgElement = imgRefs.current[parseInt(index) - 1],
            nextImgElement = imgRefs.current[parseInt(index) + 1];

          if (prevImgElement && !prevImgElement.src) {
            const prevImgSrc = prevImgElement.getAttribute('data-src');
            if (prevImgSrc) {
              prevImgElement.src = prevImgSrc;
            }
          }

          if (nextImgElement && !nextImgElement.src) {
            const nextImgSrc = nextImgElement.getAttribute('data-src');
            if (nextImgSrc) {
              nextImgElement.src = nextImgSrc;
            }
          }

          setActiveKey(parseInt(index));
          handleSwipe();
        }
      }
    });
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(loadImages, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    imgRefs.current.forEach(img => {
      if (img) {
        observer.observe(img);
      }
    });

    return () => {
      imgRefs.current.forEach(img => {
        if (img) {
          observer.unobserve(img);
        }
      });
    };
  }, [loadImages]);

  useEffect(() => {
    if (activeKey > -1 && visible === false) {
      setVisible(true);
      jumpToImage(activeKey);
    }
  }, [activeKey]);


  return (
    <div
      className={`${visible ? 'block' : 'hidden'} photogrid__gallery`}
    >
      <div className="photogrid__gallery__hide">
        <button onClick={hideGallery} type="button">&times;</button>
      </div>
      <div
        className="photogrid__prev"
      >
        <button
          type="button"
          onClick={scrollLeft}
          dangerouslySetInnerHTML={{ __html: buttonArrows ? buttonArrows.prev : '&#8592' }}
        />
      </div>
      <div ref={scrollContainer} className="photogrid__gallery_scrollcontainer">
        {photos.length &&
          photos.map((photo, i) =>
            <div key={`${i}`} className="photogrid__gallery_item">
              <img
                ref={el => imgRefs.current[i] = el}
                data-index={i}
                data-src={`${imageSrcPrefix}${getImageSrcProperty(photo, imageSrcProperty)}`}
                alt="gallery item"
                onContextMenu={disableRightClick}
              />
              {photoHasDetails(photo) === true && (
                <div className="photogrid__gallery_item__overlay">
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
      <div
        className="photogrid__next"
      >
        <button
          type="button"
          onClick={scrollRight}
          dangerouslySetInnerHTML={{ __html: buttonArrows ? buttonArrows.next : '&#8594' }}
        />
      </div>
    </div>
  );
}

export default ScrollGallery;