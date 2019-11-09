import React, { Component } from  'react';
import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import '../AddBookmark/AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = BookmarksContext;

  state = {
    title: '',
    url: '',
    description: '',
    rating: 1,
    error: null,
  };

  componentDidMount() {
    const { bookmarkId } = this.props.match.params;
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
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
      .then(response =>{
        this.setState({
          id: response.id,
          title: response.title,
          url: response.url,
          description: response.description,
          rating: response.rating,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { bookmarkId } = this.props.match.params;
    const {id, title, url, description, rating } = this.state;
    const bookmark = {id, title, url, description, rating}
    console.log(bookmark);
    this.setState({ error: null })
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(() => {
        this.resetFields(bookmark)
        this.context.updateBookmark(bookmark)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

resetFields = (newFields) =>{
  this.setState({
    id: newFields.id || '',
    title: newFields.title || '',
    url: newFields.url || '',
    description: newFields.description || '',
    rating: newFields.rating || '',
  })
}


  handleClickCancel = () => {
    this.props.history.push('/')
  };

handleTitleChange = (e) =>{
  this.setState({
    title: e.target.value
  });
}
handleUrlChange = (e) =>{
  this.setState({
    url: e.target.value
  });
}
handleDescriptionChange = (e) =>{
  this.setState({
    description: e.target.value
  });
}
handleRatingChange = (e) =>{
  this.setState({
    rating: e.target.value
  });
}

  render() {
    // console.log(selectedBookmark);
    const { error, title, url, description, rating } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
              value={title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
              value={url}
              onChange={this.handleUrlChange}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={rating}
              min='1'
              max='5'
              required
              onChange={this.handleRatingChange}
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
