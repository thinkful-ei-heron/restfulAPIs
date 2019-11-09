const o9 = { id: 9, name: 'Object 9'}
const o19 = { id: 19, name: 'Object 19'}
const o7 = { id: 7, name: 'Object 7'}

const data = [
  o7, o9, o19
] // db response

const bookmarks = data.reduce((hash, bm) => {
  hash[bm.id] = bm
  return hash
}, {})

console.log(data)
console.log(bookmarks)

// function getRecord(id) {
//   return data.find(d => d.id === id)
// }

function getRecord(id) {
  return bookmarks[id]
}

getRecord(this.params.match.bookmarkId)



const data = [
    { id: 9, name: 'Object 9'},
    { id: 19, name: 'Object 19'},
    { id: 7, name: 'Object 7'},
  ]
  
  const bookmarks = data.reduce((hash, bm) => {
    hash[bm.id] = bm
    return hash
  }, {})
  
  Object.values(bookmarks).map(console.log)