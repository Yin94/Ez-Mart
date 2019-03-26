import React, { Component } from "react";
import styles from "./MakePost.css";
import NoteItem from "./NoteItem/NoteItem";
import Button from "../../UI/Button/Button";
import { addItem, updateItem } from "../../db_api/db_items";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { downloadFiles } from "../../db_api/db_items";
import ImagesPanel from "./ImagesPanel/ImagesPanel";
import ErrorBlock from "../Auth/ErrorBlock/ErrorBlock";
let initialState = {};
const mps = state => ({
  post: state.posts.currentPost
});

const mpd = dispatch => ({});
const validator = (form, originalPost) => {
  const { name, notes, imgs, price } = form;
  const validArray = [];
  const originalImgs = originalPost ? originalPost.imgs : null;
  let validImgLength = 0;
  const validList = notes.filter(item => item.length <= 100);
  if (originalImgs) {
    //edit mode
    for (let i in imgs) {
      // should get in img object
      if (typeof imgs[i] === "string" || !(imgs[i].size > 20480000))
        validImgLength++;
    }
  } //create mode
  else
    for (let img of imgs) {
      if (img.size <= 20480000) validImgLength++;
    }

  validArray.push(name.length < 100);
  validArray.push(price == parseInt(price) && parseInt(price) > 0);
  validArray.push(validList.length === notes.length);
  validArray.push(validImgLength === imgs.length);
  return validArray;
};

export default connect(
  mps,
  mpd
)(
  class MakePost extends Component {
    mainImgRef = React.createRef();
    state = {
      notes: [],
      imgs: [],
      displayImgs: [],
      name: "",
      price: "",
      loading: false,
      succeed: false,
      error: false
    };
    onSubmitHandler = async e => {
      e.preventDefault();
      const { validation, ...form } = this.state;
      const originalPost = this.props.post;
      const vArray = validator(form, originalPost);
      const mode = this.props.match.params.mode;
      const vResult = vArray.reduce((cur, acc) => acc && cur, true);
      if (vResult) {
        //passed local verify start uploading
        this.setState({ loading: true });
        let error = null;
        if (mode === "0") error = await addItem(form);
        else {
          //  edit form logic
          error = await updateItem(form, originalPost.imgs);
        }
        if (error) {
          this.setState({ ...initialState, error: error }, () =>
            console.log(this.state)
          );
        } else {
          this.props.history.push("/my-posts");
        }
      } else alert("error formed form");

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
      this.setState({ notes });
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
        displayImgs: [],

        name: "",
        price: "",
        loading: false,
        succeed: false,
        error: false
      });
    };
    onCancelHandler = () => {
      this.props.history.goBack();
    };
    onImgFileChangeHandler = (event, index) => {
      const files = event.target.files;

      if (files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          //set the img list
          const imgs = [...this.state.imgs];
          const displayImgs = [...this.state.displayImgs];
          displayImgs[index] = e.target.result;
          imgs[index] = files[0];
          this.setState({ displayImgs, imgs });
        }.bind(this);

        reader.readAsDataURL(files[0]);
      }
    };
    imgDeleteHandler = index => {
      const img = this.state.imgs[index];
      // this.state
    };
    componentDidMount = async () => {
      const mode = this.props.match.params.mode;

      const post = this.props.post;
      if (mode === "0" || !post) return;
      const imgs = await downloadFiles(post.imgs, post.id);
      post.displayImgs = imgs;
      initialState = {
        ...post,
        loading: false,
        succeed: false,
        error: false
      };

      this.setState({ ...post });
    };
    componentDidUpdate = (prevProps, prevState) => {
      if (
        prevProps.match.params.mode !== this.props.match.params.mode &&
        this.props.match.params.mode === "0"
      ) {
        const reset = {
          notes: [],
          imgs: [],
          displayImgs: [],
          name: "",
          price: "",
          loading: false,
          succeed: false,
          error: false
        };
        this.setState({ ...reset }, () => console.log(this.state));
      }
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
      const mode = this.props.match.params.mode;

      const post = mode === "0" ? null : this.props.post;

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
              {mode !== "0" ? (
                <ImagesPanel
                  imgFileChange={this.onImgFileChangeHandler}
                  displayImgs={this.state.displayImgs}
                  imgDelete={this.imgDeleteHandler}
                />
              ) : (
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={this.onUploadHanler}
                  files={this.state.imgs}
                  required
                />
              )}
            </div>

            {this.state.loading && <Spinner />}
            {this.state.error && (
              <ErrorBlock
                className={styles.errorSpan}
                errMsg={"0" + this.state.error}
              />
            )}
            <div className={styles.submitBtnGroup}>
              {mode === "0" ? (
                <>
                  <Button type='submit' className='btn succeed'>
                    Submit
                  </Button>

                  <Button type='button' onClick={this.onClearFormHandler}>
                    Clear form
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ width: "100%" }}
                    type='submit'
                    className='btn succeed'>
                    Submit
                  </Button>
                  <Button type='button' onClick={this.onCancelHandler}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      );
    }
  }
);
