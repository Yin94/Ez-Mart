import React, { useState } from "react";
import Gallery from "../../../components/Gallery/Gallery";
import styles from "../../ItemDetail/Item.css";

import Button from "../../../UI/Button/Button";
// import moduleName from "";
export default function ImagesPanel({
  imgs,
  displayImgs,
  imgFileChange,
  imgDelete
}) {
  const mainPicStyle = { width: "100%", display: "block" };
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className={styles.mainArea}>
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
            style={{ display: "none", zIndex: "1" }}
            type='file'
          />
        </div>
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
