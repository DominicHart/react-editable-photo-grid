import React from 'react';
import { PhotoControlsProps } from '../types';

const PhotoControls: React.FC = (props: PhotoControlsProps) => {
  return (
    <ul className="photo__controls">
      {props.photo.column > 1 &&
        <li>
          <button type="button" className="photo__control" onClick={props.movePhotoLeft} data-id={props.photo.id} data-row={props.rowKey}>
            &#8592;
          </button>
        </li>
      }
      {parseInt(props.rowKey) > 1 &&
        <li>
          <button type="button" className="photo__control" onClick={props.movePhotoUp} data-id={props.photo.id} data-row={props.rowKey}>
            &#8593;
          </button>
        </li>
      }
      {parseInt(props.rowKey) < props.rowCount || parseInt(props.rowKey) === props.rowCount && props.photoCount > 1 ?
        <li>
          <button type="button" className="photo__control" onClick={props.movePhotoDown} data-id={props.photo.id} data-row={props.rowKey}>
            &#8595;
          </button>
        </li> : null
      }
      {props.photo.column < props.photoCount &&
        <li>
          <button type="button" className="photo__control" onClick={props.movePhotoRight} data-id={props.photo.id} data-row={props.rowKey}>
            &#8594;
          </button>
        </li>
      }
    </ul>
  );
};

export default PhotoControls;