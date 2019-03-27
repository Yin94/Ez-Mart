import React, { useState } from "react";
import Gallery from "../../../components/Gallery/Gallery";
import styles from "../../ItemDetail/Item.css";

import Button from "../../../UI/Button/Button";
// import moduleName from "";
export default function ImagesPanel({
  imgs,
  displayImgs,
  imgFileChange,
  imgDelete,
  addImg,
  clearImgs
}) {
  const mainPicStyle = {
    width: "100%",
    display: "block"
  };
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
        <div className={styles.lgPic}>
          <div className={styles.fadeIn} id={"show"}>
            <label htmlFor='file-input'>Change this image</label>
            <Button type='button' onClick={() => imgDelete(index)}>
              Delete
            </Button>
          </div>
          <label htmlFor='file-input'>
            <img src={displayImgs[index]} style={mainPicStyle} alt='' />
          </label>
          <input
            onChange={e => imgFileChange(e, index)}
            accept='image/*'
            id='file-input'
            style={{
              display: "none",
              zIndex: "1"
            }}
            type='file'
          />
        </div>
        <Button
          style={{
            width: "40%",
            margin: "20px auto"
          }}
          onClick={() => addImg()}
          className='btn succeed'
          type='button'>
          Add Item Image
        </Button>{" "}
        <Button
          style={{
            width: "40%",
            margin: "20px auto"
          }}
          onClick={clearImgs}
          type='button'>
          Delete All Images
        </Button>{" "}
      </div>

      <Gallery
        imgList={displayImgs}
        className={styles.gallery}
        onClick={i => {
          setIndex(i);
        }}
      />
    </div>
  );
}
