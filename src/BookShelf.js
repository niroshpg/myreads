import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'

/** @constructor Holds given group of books 
*/
class BookShelf extends Component {

    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    } 
    
    render(){
        const {books,shelfName,onShelfChanged} = this.props

        return (
                <div className="list-books-content">
                  <h2 className="bookshelf-title">{shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {   books.map((book) => (
                            <li key={book.id} ><div className='book'>
                                    <div className="book-cover" style={{width:128,height:192,backgroundImage:`url(${book.imageLinks.thumbnail})`}}>
                                    <div className="book-shelf-changer">
                                      <select defaultValue={book.shelf} onChange={(event)=>onShelfChanged(event.target.value,book)} >
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                    </div>

                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>

                                </div>
                            </li>
                        ))}
                    </ol>
                 </div>
               </div>
        )
    }
}

export default BookShelf