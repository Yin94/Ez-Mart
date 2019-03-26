import React, { Component } from "react";
import classes from "./Posts.css";
import PostBlock from "./PostBlock/PostBlock";
import { connect } from "react-redux";
import { setCurrentItem } from "../../store_redux/items/items";
import {
  startFetchingPosts,
  commitStatus,
  setCurrentPost
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
  setCurPost: post => dispatch(setCurrentPost(post))
});
export default connect(
  mps,
  mpd
)(
  class Posts extends Component {
    onClickHandler = item => {
      item.downloadAllImgs = true;
      this.props.setCurItem(item);
      this.props.history.push("/item/" + item.id);
    };
    onDeleteHandler = id => {
      this.props.history.push("");
    };
    onEditHandler = post => {
      this.props.setCurPost(post);

      this.props.history.push("/make-post/" + post.id);
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
      const list = this.props.list.map(ele => (
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
