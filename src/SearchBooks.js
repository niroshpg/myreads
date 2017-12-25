import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'

import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


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
        console.log(JSON.stringify(query.trim()));
        const searchQuery = this.state.query
        const maxResults = 20
        BooksAPI.search(searchQuery,maxResults).then((books) => {
            if (typeof books !== 'undefined' && books.length > 0) {
                 if(books.length > 0 ){
                    this.setState({ 
                        booksAvaialble: books
                    }) 
                 }
             }
              else{
                this.setState({ 
                    booksAvaialble: []
                }) 
            }   
           
        })
        
        //console.log(JSON.stringify(this.state.books.length));
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
        const { books,shelfName} = this.props
        const queryString = this.state.query
        const avaialbleBooks = this.state.booksAvaialble
        
//        let showingBooks
//        if (queryString ) {
//            let match = new RegExp(escapeRegExp(queryString), 'i')
//            showingBooks =  avaialbleBooks.filter((abook) => match.test(abook.title) || match.test(abook.authors) )
//            console.log("from Q");
//        } else {
//            showingBooks = this.props.books
//            console.log("default");
//        }
        
        avaialbleBooks.sort(sortBy('name'))
        
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
                    value={queryString}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf shelfName={shelfName} books={avaialbleBooks} onShelfChanged={this.props.onShelfChanged}/>
            </div>
          </div>
        
        )
    }
}

export default SearchBooks