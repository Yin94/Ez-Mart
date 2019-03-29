import React, { Component } from 'react';
import styles from './MakePost.css';
import NoteItem from './NoteItem/NoteItem';
import Button from '../../UI/Button/Button';
import { addItem, updateItem } from '../../db_api/db_items';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { downloadFiles } from '../../db_api/db_items';
import ImagesPanel from './ImagesPanel/ImagesPanel';
import ErrorBlock from '../Auth/ErrorBlock/ErrorBlock';
import { addPost } from '../../store_redux/posts/posts';
import Joi from 'joi';
import { add_Schema } from './schema';
let initialState = {
  name: '',
  notes: [],
  imgs: [],
  displayImgs: [],
  price: '',
  loading: false,
  succeed: false,
  error: false
};
const add_item_handler = async function(err, value, item, obj) {
  if (!err) {
    //validate succeed

    let result = await addItem(item);
    if (result.id) {
      obj.props.addPost(result.id);
      obj.props.history.push('/my-posts');
    } else
      obj.setState({
        succeed: false,
        loading: false,
        error: result
      });
  } else {
    // validate failed
    obj.setState({
      succeed: false,
      loading: false,
      error: err.message
    });
  }
};

const update_item_handler = async function(
  err,
  value,
  item,
  originalItem,
  obj
) {
  if (err)
    obj.setState({
      error: err.message,
      succeed: false,
      loading: false
    });
  else {
    const o_imgs = originalItem.imgs;
    const imgs = item.imgs;
    const tbd_imgs = o_imgs.filter(ele => !imgs.find(e => e === ele));
    const tba_imgs = imgs.filter(ele => ele instanceof File);
    const error = await updateItem(item, tbd_imgs, tba_imgs);
    if (error)
      obj.setState({
        error,
        succeed: false,
        loading: false
      });
    else obj.props.history.push('/my-posts');
  }
};
const mps = state => ({
  post: state.posts.currentPost
});

const mpd = dispatch => ({
  addPost: id => dispatch(addPost(id))
});

export default connect(
  mps,
  mpd
)(
  class MakePost extends Component {
    mainImgRef = React.createRef();
    state = {
      name: '',
      notes: [],
      imgs: [],
      displayImgs: [],
      price: '',
      loading: false,
      succeed: false,
      error: false
    };

    onSubmitHandler = async e => {
      e.preventDefault();
      const obj = this;
      const mode = this.props.match.params['mode'];

      obj.setState({ loading: true });
      //validation
      const {
        succeed,
        loading,
        error,
        publisher,
        lastModifyTime,
        ...item
      } = this.state;
      item.imgs = [...item.imgs];
      if (mode === '0')
        Joi.validate(item, add_Schema, (err, value) =>
          add_item_handler(err, value, item, obj)
        );
      else {
        //update item
        Joi.validate(item, add_Schema, (err, value) =>
          update_item_handler(err, value, item, this.props.post, obj)
        );
      }
    };
    onDeleteNoteHandler = index => {
      const notes = this.state.notes;
      notes.splice(index, 1);
      this.setState({ notes });
    };
    onAddNoteHandler = () => {
      const list = [...this.state.notes];
      list.push('');
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
    onAddImgHandler = e => {
      const displayImgs = [...this.state.displayImgs];
      displayImgs.push(
        'https://jessicahlawrence.files.wordpress.com/2014/03/plus_sign.png'
      );
      this.setState({ displayImgs });
    };
    onClearNotesHandler = () => {
      this.setState({ notes: [] });
    };
    onClearFormHandler = () => {
      this.setState({ ...initialState });
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
      const imgs = [...this.state.imgs];
      const displayImgs = [...this.state.displayImgs];
      imgs.splice(index, 1);
      displayImgs.splice(index, 1);

      this.setState({ imgs, displayImgs });
    };
    onClearImgHandler = () => {
      this.setState({ displayImgs: [], imgs: [] });
    };
    componentDidMount = async () => {
      const mode = this.props.match.params.mode;

      const post = this.props.post;
      if (mode === '0' || !post) return;
      const imgs = await downloadFiles(post.imgs, post.id);
      post.displayImgs = imgs;

      this.setState({
        ...post,
        loading: false,
        succeed: false,
        error: false
      });
    };
    componentDidUpdate = (prevProps, prevState) => {
      if (
        this.props.match.params.mode === '0' &&
        prevProps.match.params.mode !== '0'
      )
        this.setState({ ...initialState });
    };

    render() {
      const mode = this.props.match.params.mode;
      if (!this.state.name && mode !== '0') return <></>;
      const displaynotes = this.state.notes.map((item, index) => (
        <NoteItem
          key={'yo' + index}
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
                style={{ backgroundColor: 'red' }}>
                Clear Notes
              </Button>
              {displaynotes}
            </div>
            <div style={{ width: '100%', margin: 'auto' }}>
              {mode !== '0' ? (
                <ImagesPanel
                  imgFileChange={this.onImgFileChangeHandler}
                  displayImgs={this.state.displayImgs}
                  imgDelete={this.imgDeleteHandler}
                  addImg={this.onAddImgHandler}
                  clearImgs={this.onClearImgHandler}
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

            {this.state.error && (
              <ErrorBlock
                className={styles.errorSpan}
                errMsg={'0' + this.state.error}
              />
            )}
            {this.state.loading ? (
              <Spinner />
            ) : (
              <div className={styles.submitBtnGroup}>
                {mode === '0' ? (
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
                      style={{ width: '100%' }}
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
            )}
          </form>
        </div>
      );
    }
  }
);
