import {transformData} from './helper';

//Locall server must be running
const api = "http://localhost:3001"


//Generate a unique token for use with the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// GATEGORIES
// Get all available gategories from server
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)


// POSTS
// Get all posts from server
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => transformData(data))
    .then(data => data)

// Add a new post to server
export const addNewPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())

// Delete a post from the server
export const erasePost = (id) =>
  fetch(`${api}/posts/${id}`, {method: 'DELETE', headers})
    .then(res => res.json())

// Get the details of a single post
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

// Edit the details of an existing post
export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, body})
  }).then(res => res.json())

// Get all of the posts for a particular category
export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => transformData(data))
    .then(data => data)

// Used for voting on a post
export const votePost = (direction, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"option": direction})
  }).then(res => res.json())


// COMMENTS
// Get all the comments for a single post
export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => transformData(data))
    .then(data => data)

// Used for voting on a comment
export const voteComment = (direction, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"option": direction})
  }).then(res => res.json())

// Delete a comment from the server
export const eraseComment = (id) =>
fetch(`${api}/comments/${id}`, {method: 'DELETE', headers})
  .then(res => res.json())

// Add a new comment to server
export const addNewComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json())

// Edit the details of an existing comment
export const updateComment = (id, timestamp, body) =>
fetch(`${api}/comments/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({timestamp, body})
}).then(res => res.json())