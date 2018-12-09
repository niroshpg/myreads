import React from 'react';

function BookShelf(props){

  const {books,shelfName,onShelfChanged} = props

  return (
      <div className="list-books-content">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {   books.map((book) => (
                book &&  <li key={book.id} >
                <div className='book'>
                  {
                    (book.imageLinks && book.imageLinks.thumbnail) ?
                      <div  className="book-cover"
                            style={{  width:128,
                                  height:192,
                                  backgroundImage:`url(${book.imageLinks.thumbnail})`}}>
                              <div className="book-shelf-changer">
                                <select defaultValue={book.shelf}
                                  onChange={(event)=>onShelfChanged(event.target.value,book)} >
                                  <option value="moveto" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                      </div>
                      :
                      <div className="book-cover">
                        <p>Cover image not found</p>
                      </div>
                        }
                        <div className="book-title"> {book.title}</div>
                        <div className="book-authors"> {book.authors}</div>
                  </div>
                  </li>
              ))
            }
          </ol>
       </div>
     </div>
  )
}

export default BookShelf
