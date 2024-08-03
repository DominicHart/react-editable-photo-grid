import React, { useEffect, useState } from 'react'
import { PhotoGrid, PhotoItem, PhotoRows, sortPhotosIntoRows } from 'react-editable-photo-grid';
import PhotoMenu from './PhotoMenu';
import data from './photos.json';

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]),
    [rows, setRows] = useState<PhotoRows>([]),
    [changes, setChanges] = useState(0),
    [editing, setEditing] = useState(false),
    [selectedPhotos, setSelectedPhotos] = useState([]),
    [activeDropdown, setActiveDropdown] = useState(null);

  const getData = async () => {
    setPhotos(data);
    setRows(sortPhotosIntoRows(data));
  }

  const edit = () => {
    // edit menu action here
  }

  const updateSelectedPhotos = (value: string, checked: boolean): void => {
    let newSelectedPhotos = [...selectedPhotos];

    if (checked) {
      newSelectedPhotos.push(value);
    } else {
      newSelectedPhotos = newSelectedPhotos.filter(function (item) {
        return item !== value;
      })
    }

    setSelectedPhotos(newSelectedPhotos);
  }

  const openDropdown = (e) => {
    e.preventDefault();

    if (activeDropdown === e.target.dataset.key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(e.target.dataset.key)
    }
  }

  useEffect(() => {
    getData();
    setEditing(true);
  }, [])

  const photoMenu = <PhotoMenu
    selectedPhotos={selectedPhotos}
    updateSelectedPhotos={updateSelectedPhotos}
    activeDropdown={activeDropdown}
    openDropdown={openDropdown}
    edit={edit}
  />

  return (
    <div>
      <PhotoGrid
        isEditing={editing}
        photos={photos}
        rows={rows}
        updateRows={setRows}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={() => setChanges(changes + 1)}
        photoMenu={photoMenu}
        imageSrcPrefix="/api/gallery/"
        imageSrcProperty="thumbnail_path"
        useGallery={true}
        gallerySrcProperty="image_path"
        galleryType="scroll"
      />
    </div>
  );
}

export default Photos;