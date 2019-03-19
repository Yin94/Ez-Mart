import React, { Component } from "react";
import styles from "./MakePost.css";
import NoteItem from "./NoteItem/NoteItem";
import Button from "../../UI/Button/Button";
import { addItem } from "../../db_api/db_items";
const validator = form => {
  const { name, notes, imgs, price } = form;
  const validArray = [];
  let validImgLength = 0;
  const validList = notes.filter(item => item.length <= 100);
  for (let img of imgs) {
    if (img.size <= 20480000) validImgLength++;
  }
  validArray.push(name.length < 100);
  validArray.push(price == parseInt(price) && parseInt(price) > 0);
  validArray.push(validList.length === notes.length);
  validArray.push(validImgLength === imgs.length);
  return validArray;
};
export default class MakePost extends Component {
  state = {
    notes: [],
    imgs: [],
    name: "",
    price: "",
    validation: Array(4).fill(false)
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const { validation, ...form } = this.state;
    const vArray = validator(form);
    const vResult = vArray.reduce((cur, acc) => acc && cur, true);
    if (vResult) addItem(form);
    else alert("error formed form");
    //got all the form data, need validation then send to store and update to server
  };
  onDeleteNoteHandler = index => {
    const notes = this.state.notes;
    notes.splice(index, 1);
    this.setState({ notes });
  };
  onAddNoteHandler = () => {
    const list = [...this.state.notes];
    list.push("");
    this.setState({ notes: list });
  };
  onNoteChangedHander = (e, index) => {
    const notes = [...this.state.notes];
    notes[index] = e.target.value;
    this.setState({ notes }, () => {
      console.log(this.state.notes);
    });
  };
  onUploadHanler = e => {
    this.setState({ imgs: e.target.files });
  };
  onClearNotesHandler = () => {
    this.setState({ notes: [] });
  };
  onClearFormHandler = () => {
    this.setState({
      notes: [],
      imgs: [],
      name: "",
      price: ""
    });
  };
  render() {
    const displaynotes = this.state.notes.map((item, index) => (
      <NoteItem
        key={"yo" + index}
        index={index}
        deleteNote={this.onDeleteNoteHandler}
        noteChanged={this.onNoteChangedHander}
        value={this.state.notes[index]}
      />
    ));

    return (
      <div className={styles.container}>
        <form className={styles.postForm} onSubmit={this.onSubmitHandler}>
          <div className={styles.nameAndPrice}>
            <div>
              <label htmlFor=''>title:</label>
              <input
                onChange={e => {
                  const name = e.target.value;
                  this.setState({ name });
                }}
                value={this.state.name}
                type='text'
                required
              />
            </div>
            <div>
              <label htmlFor=''>price</label>
              <input
                onChange={e => {
                  const price = e.target.value;

                  this.setState({ price });
                }}
                value={this.state.price}
                type='text'
                required
              />
            </div>
          </div>
          <div className={styles.notesGroup}>
            <Button
              type='button'
              onClick={this.onAddNoteHandler}
              className='btn succeed'>
              Add Note
            </Button>
            <Button
              type='button'
              onClick={this.onClearNotesHandler}
              style={{ backgroundColor: "red" }}>
              Clear Notes
            </Button>
            {displaynotes}
          </div>
          <div>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={this.onUploadHanler}
              files={this.state.imgs}
              required
            />
          </div>

          <div className={styles.submitBtnGroup}>
            <Button type='submit' className='btn succeed'>
              Submit
            </Button>

            <Button type='button' onClick={this.onClearFormHandler}>
              Clear form
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
