import React from 'react';
import { PhotoControlsProps } from '../types';
import { castRowKey } from '../utils';
import '../styles.css';

const PhotoControls = (props: PhotoControlsProps) => {
  return (
    <ul className="photogrid--photo__controls">
      {props.photo.column > 1 &&
        <li>
          <button
            type="button"
            className="photo__control move__photo__left"
            onClick={props.movePhotoLeft}
            data-id={props.photo.id}
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.left : '&#8592' }}
          />
        </li>
      }
      {castRowKey(props.rowKey) > 1 &&
        <li>
          <button
            type="button"
            className="photo__control move__photo__up"
            onClick={props.movePhotoUp}
            data-id={props.photo.id}
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.up : '&#8593' }}
          />
        </li>
      }
      {castRowKey(props.rowKey) < props.rowCount || castRowKey(props.rowKey) === props.rowCount && props.photoCount > 1 ?
        <li>
          <button
            type="button"
            className="photo__control move__photo__down"
            onClick={props.movePhotoDown}
            data-id={props.photo.id}
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.down : '&#8595' }}
          />
        </li> : null
      }
      {props.photo.column < props.photoCount &&
        <li>
          <button
            type="button"
            className="photo__control  move__photo__right"
            onClick={props.movePhotoRight}
            data-id={props.photo.id}
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.right : '&#8594' }}
          />
        </li>
      }
    </ul>
  );
};

export default PhotoControls;