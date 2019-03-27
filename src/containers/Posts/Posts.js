import React, { Component } from "react";
import classes from "./Posts.css";
import PostBlock from "./PostBlock/PostBlock";
import { connect } from "react-redux";
import { setCurrentItem } from "../../store_redux/items/items";
import Button from "../../UI/Button/Button";
import SearchBar from "../../UI/SearchBar/SearchBar";
import {
  startFetchingPosts,
  commitStatus,
  setCurrentPost,
  startDeletingPost
} from "../../store_redux/posts/posts";
const mps = state => ({
  isStart: state.posts.isFirst,
  idList: state.posts.idList,
  list: state.posts.list,
  err: state.posts.err,
  succeed: state.posts.succeed
});

const mpd = dispatch => ({
  startFetchPosts: (mode, list) => dispatch(startFetchingPosts(mode, list)),
  setCurItem: item => dispatch(setCurrentItem(item, true)),
  commitStatus: item => dispatch(commitStatus()),
  setCurPost: post => dispatch(setCurrentPost(post)),
  deletePost: id => dispatch(startDeletingPost(id))
});
export default connect(
  mps,
  mpd
)(
  class Posts extends Component {
    state = {
      filter: ""
    };
    onClickHandler = item => {
      item.downloadAllImgs = true;
      this.props.setCurItem(item);
      this.props.history.push("/item/" + item.id);
    };
    onResetFilterHandler = () => {
      this.setState({ filter: "" });
    };
    onDeleteHandler = id => {
      this.props.deletePost(id);
    };
    onEditHandler = post => {
      this.props.setCurPost(post);

      this.props.history.push("/make-post/" + post.id);
    };
    onSearchHandler = (e, value) => {
      if (e.keyCode === 13 || e.target.name === "searchBtn") {
        this.setState({ filter: value });
      }
    };
    componentDidMount = () => {
      this.props.startFetchPosts(this.props.isStart, this.props.idList);
    };
    componentWillUnmount = () => {
      this.props.commitStatus();
    };

    render() {
      if (!this.props.succeed) {
        return null;
      }
      let list = this.props.list
        .filter(item => item.name.includes(this.state.filter))
        .map(ele => (
          <div className={classes.postRow} key={ele.id}>
            <PostBlock
              post={ele}
              editPost={() => this.onEditHandler(ele)}
              deletePost={() => this.onDeleteHandler(ele.id)}
              onClick={() => this.onClickHandler(ele)}
            />{" "}
          </div>
        ));

      return (
        <div className={classes.container}>
          <SearchBar searchActivated={this.onSearchHandler} />
          <Button
            style={{ width: "20%", height: "40px", margin: "10px 0" }}
            onClick={this.onResetFilterHandler}
            className='btn succeed'>
            reset search
          </Button>
          <div className={classes.postRow}>
            <strong>Post Id</strong>
            <strong>Title</strong>
            <strong>Last Update Time</strong>
            <strong>Operation</strong>
          </div>
          {list}
        </div>
      );
    }
  }
);
