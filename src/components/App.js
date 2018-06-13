import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
   
   this.baseUrl = 'https://practiceapi.devmountain.com/api/'; 
  }
    
  componentDidMount() {
    axios.get(this.baseUrl + 'posts').then(results =>{
      this.setState({posts: results.data})
    }).catch(err => 'Oops, you missed something.');
  }

  updatePost(id, text) {
    axios.put(`${this.baseUrl}posts?id=${ id }`, { text }).then(results => {
      this.setState({posts: results.data})
    }).catch(err => 'oops, we couldn\'t quite edit that post.')
  }

  deletePost( id ) {
    axios.delete(`${this.baseUrl}posts?id=${ id }`).then(results => {
      this.setState({posts: results.data})
    }).catch(err => 'oops, we missed something here.')
  }

  createPost( text ) {
    axios.post(`${this.baseUrl}posts`, { text }).then(results => {
      this.setState({ posts: results.data })
    }).catch(err => 'oops, sorry. something went wrong')
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( post => (
              <Post key={ post.id }
                text={ post.text}
                date={ post.date } 
                id={ post.id }
                updatePostFn={ this.updatePost }
                deletePostFn={ this.deletePost }
                />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
