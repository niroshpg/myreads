import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'
import sortBy from 'sort-by'

import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI'

/** @constructor Search books arcording to the specied query and add selected books to specified shelf
 */
class SearchBooks extends Component {

  statics:  {
       MAX_RESULTS: 20
  }

  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
  }

   constructor(props){
        super(props)

        this.state = {
            query: '',
            booksAvaialble: props.books
        }
    }


    /**
     * update the query
     */
    updateQuery = (query) => {
         this.setState({
            query: query
        })

        const searchQuery = this.state.query
        const maxResults = 20

        BooksAPI.search(searchQuery,maxResults).then((books) => {

            if (typeof books !== 'undefined' && books.length > 0) {
                 if(books.length > 0 ){
                   console.log(" available = " + this.state.booksAvaialble.length)
                      console.log(" from server = " + books.length)
                   let serverAvailableBooks = books.filter((bookFromServer)=>{
                     if(bookFromServer!== undefined)
                     {
                       const theBookFound = this.state.booksAvaialble.find((userBook)=>{
                               return userBook.id === bookFromServer.id
                               })
                       return theBookFound === undefined;
                     }
                     else{
                       return false;
                     }

                   }).map((book)=>{
                     book.shelf='none'
                     return book;
                   });

                  this.setState({
                      booksAvaialble: this.state.booksAvaialble.concat(
                        serverAvailableBooks
                      )
                  })
                 }
             }
              else{
                this.setState({
                    booksAvaialble: []
                })
            }

        })

    }

    /**
     * clear the query
     */
    clearQuery = () => {
        this.setState({ query: '' })
    }

    componentDidMount() {
        this.clearQuery();

    }

    /**
     * @description renders the search books view
     */
    render(){
        const { shelfName} = this.props
        const {booksAvaialble} = this.state

        booksAvaialble.sort(sortBy('name'))

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
                <Debounce time="400" handler="onChange">
                  <input type="text" placeholder="Search by title or author"
                      onChange={(event) => this.updateQuery(event.target.value)}
                  />
                </Debounce>

              </div>
            </div>
            <div className="search-books-results">
            {
              booksAvaialble.length > 0 ?
              <BookShelf shelfName={shelfName} books={booksAvaialble} onShelfChanged={this.props.onShelfChanged}/>
              :
              <p>Books not found</p>
            }
            </div>
          </div>

        )
    }
}

export default SearchBooks
