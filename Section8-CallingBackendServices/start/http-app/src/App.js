import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import logger from "./services/logService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATE";
    // the two methods below are equivalent
    const { data } = await http.put(config.apiEndpoint + "/" + post.id, post);
    // axios.patch(config.apiEndpoint + "/" + post.id, { title: post.title });

    // update the ui
    const posts = [...this.state.posts];
    const idx = posts.indexOf(post);
    posts[idx] = { ...post };
    this.setState({ ...posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    // optimistic update - gives user an illusion of a
    // fast website. i.e. update the ui first, and if
    // anything went wrong, revert.
    const originalPosts = this.state.posts;

    // better way to delete
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
      // throw new Error(""); // show the revert
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this post has already been deleted.");
      logger.log(ex);
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
