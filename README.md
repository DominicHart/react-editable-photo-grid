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
imageSrcPrefix | String | A string that represents the url prefix for each photo image src attribute.
imageSrcProperty | String | Determines which photo property is used for the img src parameter.
useGallery | Boolean | Activate the Gallery component.
highestGalleryKey | Number | Pass this prop if you are using the gallery component. This must be the highest image column overall index.
buttonArrows | ButtonArrows | Allows you to override the basic button arrows with custom html.

## How to Use

To use the PhotoGrid component you can import it like this:
```tsx
import { PhotoGrid, PhotoRows } from 'react-editable-photo-grid';
```
PhotoGrid represents the component and PhotoRows is the TS type for the data.
You can add the component to your code like this:
```tsx
    const [photos, setPhotos] = useState<PhotoRows>({});

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

### How is it editable?

The PhotoGrid component allows you to structure your photos in rows and columns. As such it provides controls to change the position of the rows within the page and the columns within the rows. Each time an edit is made it updates the rows prop. It also increases the changes prop.

You can use the changes prop to work out if any edits have been made. You can then submit your edits to your API to permanently store the changes. The easiest way to achieve this is to add 'row' and 'column' properties to the data handled by your API.