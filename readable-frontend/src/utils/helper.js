import uuidv4 from 'uuid/v4';

//Capitalize the first letter of a word
export function capitalize (str = "...") {
  return str[0].toUpperCase() + str.slice(1)
}

//Convert unix date to readable "Month-dd-yyyy" format
export function dateConvert(timestamp = Date.now()) {
  const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  return `${month}-${day}-${year}`;
}

//Create a new post object ready to be submited to the server
export function createPost(data) {
  const newPost = {
    id: uuidv4(),
    timestamp: data.date,
    title: data.title,
    body: data.body,
    author: data.author,
    category: data.category
  };
  return newPost;
}

// Transform posts array from server to Objects with Id
export function transformData(data) {
  let newObj = {};
  for (let i=0; i<data.length; i++) {
    newObj[data[i].id] = data[i];
  }
  return newObj;
}

