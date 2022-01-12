import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATE";
    // the two methods below are equivalent
    const { data } = await axios.put(apiEndpoint + "/" + post.id, post);
    // axios.patch(apiEndpoint + "/" + post.id, { title: post.title });

    // update the ui
    const posts = [...this.state.posts];
    const idx = posts.indexOf(post);
    posts[idx] = { ...post };
    this.setState({ ...posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    await axios.delete(apiEndpoint + "/" + post.id);

    // // delete from ui table
    // let posts = [...this.state.posts];
    // const idx = posts.indexOf(post);
    // posts = posts.slice(0, idx).concat(posts.slice(idx + 1));
    // this.setState({ posts });
    // console.log("Delete", post);

    // better way to delete
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
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
