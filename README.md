# react-editable-photo-grid

An editable photo grid for react applications.
```tsx
import React, { useState, useEffect }  from 'react';
import { PhotoGrid, PhotoRows } from 'react-editable-photo-grid';

const Photos: React.FC = () => {
    const [photos, setPhotos] = useState<PhotoRows>({}),
        [changes, setChanges] = useState<Number>(0),
        [selectedPhotos, setSelectedPhotos] = useState<Array<string>>([]);

    const getData = () => {
        // Fetch photos from API and update state
    }

    useEffect(() => {
        getData();
    }, []);

    return (
      <PhotoGrid
        isEditing={true}
        rows={photos}
        updateRows={setPhotos}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={() => setChanges(changes + 1)}
        imageSrcPrefix="/api/image"
        imageSrcProperty="thumbnail_path"
      />
    );
}

export default Photos;
```

## How to Install
```
npm i react-editable-photo-grid
```

## Required Props

Properties | Type | Description
------------ | ------------- | -------------
isEditing | Boolean | Switches the grid from display to editable
rows | PhotoRows | An array of rows where the keys are row numbers and items are photo arrays.
updateRows | Void | A method that updates the rows data from the parent
selectedPhotos | Array<string> | This can be populated with photo ids for batch operations
updateSelectedPhotos | Void | A method to update the selectedPhotos prop
changes | Number | Tracks when changes have been made (the editable part)
increaseChanges | Void | A method to update the changes prop
imageSrcPrefix | String | A string that represents the url prefix for each photo image src attribute. This will be used for the grid and gallery.
imageSrcProperty | String | Determines which photo property is used for the grid img src parameter.
useGallery | Boolean | Activate the Gallery component.
buttonArrows | ButtonArrows | Allows you to override the basic button arrows with custom html.
gallerySrcProperty | String | Determines which photo property is used for the gallery image src parameter.
galleryButtonArrows | GalleryButtonArrows | Allows you to override the gallery prev and next button arrows with custom html.
onPhotoClick | Void | A method that receives the photo id on click

## How to Use

To use the PhotoGrid component you can import it like this:
```tsx
import { PhotoGrid, PhotoRows, PhotoItem, sortPhotosIntoRows } from 'react-editable-photo-grid';
import { getPhotos } from 'api';
```
PhotoGrid represents the component and PhotoRows is the TS type for the data.
You can add the component to your code like this:
```tsx
    const [photos, setPhotos] = useState<PhotoItem[]>([]),
      [rows, setRows] = useState<PhotoRows[]>({})

    const loadPhotos = (): void => {
      const photos = await getPhotos();
      setPhotos(photos);
      setRows(sortPhotosIntoRows(photos));
    }

    return (
      <PhotoGrid
        isEditing={true}
        photos={photos}
        rows={rows}
        updateRows={setRows}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={() => setChanges(changes + 1)}
        imageSrcPrefix="/api/image"
        imageSrcProperty="/thumbnail_path"
      />
    );
```
### How data should be structured

Structure the data for the PhotoGrid like this:

```tsx
export interface PhotoRows {
  [key: number]: PhotoItem[];
}

export interface PhotoItem {
  id: string;
  column: number;
  image_path: string;
  thumbnail_path: string;
  carousel_key: number;
  width: number;
  height: number;
}
```

PhotoItem represents a single photo data object. PhotoRows is an associative array where each key is a row number and items an array of associated photos.

### Passing a custom dropdown menu

You can add a menu to the grid by passing a component as the photoMenu prop. The grid will clone this prop and add it to each photo. There isn't a set format that a menu has to be but here is an example:

```tsx
const PhotoMenu = (props: PhotoMenuProps) => {
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
          style={{ display: props.activeDropdown ===    props.photo.id ? 'block' : 'none' }}
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
```

And here is how you can prepare it for the grid:

```tsx
  const photoMenu = <PhotoMenu
    selectedPhotos={selectedPhotos}
    updateSelectedPhotos={updateSelectedPhotos}
    activeDropdown={activeDropdown}
    openDropdown={openDropdown}
    edit={edit}
  />
```

You can then pass photoMenu to the grid as a prop. See the sample component for more details

### Using the gallery

You can enable the gallery by passing the the required props like this:

```tsx
  <PhotoGrid
    { ... other props}
    useGallery={true}
    gallerySrcProperty="image_path"
  />
```

This will make the gallery appear when a photo is clicked.

## Examples

See the samples directory for sample usage.

## How is it editable?

The PhotoGrid component allows you to structure your photos in rows and columns. As such it provides controls to change the position of the rows within the page and the columns within the rows. Each time an edit is made it updates the rows prop. It also increases the changes prop.

You can use the changes prop to work out if any edits have been made. You can then submit your edits to your API to permanently store the changes. The easiest way to achieve this is to add 'row' and 'column' properties to the data handled by your API.