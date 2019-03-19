import React, { Component } from "react";
import styles from "./MakePost.css";
import NoteItem from "./NoteItem/NoteItem";
import Button from "../../UI/Button/Button";

export default class MakePost extends Component {
  state = {
    noteList: [],
    images: [],
    title: "",
    price: ""
  };
  onSubmitHandler = e => {
    e.preventDefault();
    //got all the form data, need validation then send to store and update to server
  };
  onDeleteNoteHandler = index => {
    const noteList = this.state.noteList;
    noteList.splice(index, 1);
    this.setState({ noteList });
  };
  onAddNoteHandler = () => {
    const list = [...this.state.noteList];
    list.push("");
    this.setState({ noteList: list });
  };
  onNoteChangedHander = (e, index) => {
    const noteList = [...this.state.noteList];
    noteList[index] = e.target.value;
    this.setState({ noteList }, () => {
      console.log(this.state.noteList);
    });
  };
  onUploadHanler = e => {
    //check validity
    const images = this.state.images;
    images.push(e.target.files[0]);
    this.setState({ images }, console.log(this.state.images));
  };
  onClearNotesHandler = () => {
    this.setState({ noteList: [] });
  };
  onClearFormHandler = () => {
    this.setState({
      noteList: [],
      images: []
    });
  };
  render() {
    const displayNoteList = this.state.noteList.map((item, index) => (
      <NoteItem
        key={"yo" + index}
        index={index}
        deleteNote={this.onDeleteNoteHandler}
        noteChanged={this.onNoteChangedHander}
        value={this.state.noteList[index]}
      />
    ));

    return (
      <div className={styles.container}>
        <form className={styles.postForm} onSubmit={this.onSubmitHandler}>
          <div className={styles.titleAndPrice}>
            <div>
              <label htmlFor=''>title:</label>
              <input
                onChange={e => {
                  const title = e.target.value;
                  this.setState({ title });
                }}
                value={this.state.title}
                type='text'
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
              />
            </div>
          </div>
          <div className={styles.notesGroup}>
            <Button onClick={this.onAddNoteHandler} className='btn succeed'>
              Add Note
            </Button>
            <Button
              onClick={this.onClearNotesHandler}
              style={{ backgroundColor: "red" }}>
              Clear Notes
            </Button>
            {displayNoteList}
          </div>
          <div>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={this.onUploadHanler}
            />
          </div>

          <div className={styles.submitBtnGroup}>
            <Button type='submit' className='btn succeed'>
              Submit
            </Button>
            <Button onClick={this.onClearFormHandler}>Clear form</Button>
          </div>
        </form>
      </div>
    );
  }
}
