import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'

import BookShelf from './BookShelf.js'
import BooksAPI from './BooksAPI.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

/** @constructor Search books arcording to the specied query and add selected books to specified shelf
 */
class SearchBooks extends Component {
  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
  }
    /**
     This state holdthe input query text for filtering availalbe books to display
    */
    state = {
        query: '',
    }
    
    /**
     * update the query
     */
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    /**
     * clear the query
     */
    clearQuery = () => {
        this.setState({ query: '' })
    }
 
    /**
     * @description renders the search books view
     */
    render(){
        const { books,shelfName} = this.props
        const { query } = this.state
        let showingBooks
        if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks =  books.filter((book) => match.test(book.title) || match.test(book.authors) )
        } else {
            showingBooks = books
        }
        
        showingBooks.sort(sortBy('name'))
        
        return (
        <div className="search-books">
            <div className="search-books-bar">     
            <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf shelfName={shelfName} books={showingBooks
            } onShelfChanged={this.props.onShelfChanged}/>
            </div>
          </div>
        )
    }
}

export default SearchBooks