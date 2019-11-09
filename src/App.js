import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import EditBookmark from './EditBookmark/EditBookmark';

class App extends Component {
  state = {
    bookmarks: {},
    error: null,
  };



  setBookmarks = bookmarks => {
    // reduce loop over bookmarks, set state 
    bookmarks = bookmarks.reduce((hash, bm) =>{
      hash[bm.id] = bm;
      return hash;
    }, {});

    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: {
        ...this.state.bookmarks, bookmark
      },
    })
  }

  deleteBookmark = bookmarkId => {
    let newBookmarks = Object.values(this.state.bookmarks).filter(bm => {
      return bm.id !== bookmarkId;
    });
    this.setState({
      bookmarks: newBookmarks
    })
  }

  updateBookmark = () =>{
    
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark,
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              exact
              path='/bookmarks'
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              exact
              path='/bookmarks/:bookmarkId'
              component={EditBookmark}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
