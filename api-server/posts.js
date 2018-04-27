const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "d4edc9c6-0749-4665-8556-cf93c1596c77": {
    id: "d4edc9c6-0749-4665-8556-cf93c1596c77",
    timestamp: 1516306334000,
    title: "Your Amazon Echo could soon have its own 'memory'",
    body: "The upcoming feature will enable Alexa to \"store arbitrary information you want and retrieve it later,\" according to Amazon. It's a bit like reminders, but the information can be stored for an indefinite amount of time.\n\nFor example, you could ask Alexa to remember family members' birthdays or where you parked your car. ",
    author: "Maria Steiner",
    category: "udacity",
    voteScore: 17,
    deleted: false,
    commentCount: 0
  },
  "f44029cf-3307-4524-be46-9b98eb8ce62d": {
    id: "f44029cf-3307-4524-be46-9b98eb8ce62d",
    timestamp: 1513109534000,
    title: "The Comprehensive First-Time Home Buyer's Guide",
    body: "Becoming a homeowner is well worth pursuing for its financial benefits. If you know that you are going to stay local, it makes sense to save money by paying an affordable mortgage instead of renting a home for a higher monthly payment. In addition, each time you pay toward your mortgage, you are one step closer to owning the property in full. ",
    author: "Marcus Stevenson",
    category: "technology",
    voteScore: 14,
    deleted: false,
    commentCount: 0
  },
  "9ae9b250-8efb-4e4b-a880-5b55f0cc35fb": {
    id: "9ae9b250-8efb-4e4b-a880-5b55f0cc35fb",
    timestamp: 1488831134000,
    title: "Reasons Why You Need A Property Manager",
    body: "It is easy to get lost in the details when you are juggling various responsibilities like work and family along with your properties. This is why a property manager, who is a trained and experienced real estate professional, can take the weight of these responsibilities off your shoulders. For example, property managers are adept at processing paperwork, receiving rent checks, responding to phone calls, and conducting the initial walk-through and moving out process.",
    author: "Rico Hernadez",
    category: "redux",
    voteScore: -2,
    deleted: false,
    commentCount: 0
  },
  "780f185f-3fb5-4a66-877d-24ebc9d86431": {
    id: "780f185f-3fb5-4a66-877d-24ebc9d86431",
    timestamp: 1524833803685,
    title: "Ways To Enjoy Springtime In Virginia Beach",
    body: "These shorter blog posts are better suited to cover narrow topics like a brief introductory seller's guide or a neighborhood overview. This is why I chose a snapshot of Virginia Beach's springtime activities and did not attempt anything more in-depth that would have been stretched too thin.",
    author: "Dolores Smith",
    category: "react",
    voteScore: 2,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
