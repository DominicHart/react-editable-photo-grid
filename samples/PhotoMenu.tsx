import React from 'react';

import { Checkbox } from 'react-editable-photo-grid';

const PhotoMenu = (props) => {
  return (
    <div className="photomenu">
      <Checkbox
        value={props.photo.id}
        onClick={props.updateSelectedPhotos}
        checked={props.selectedPhotos.includes(props.photo.id)}
      />
      <div>
        <button
          data-key={props.photo.id}
          type="button"
          onClick={props.openDropdown}
        >
          Edit
        </button>
        <ul
          style={{ display: props.activeDropdown === props.photo.id ? 'block' : 'none' }}
        >
          <li>
            <a
              href={props.photo.id}
              onClick={props.edit}>
              Edit
              </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoMenu;