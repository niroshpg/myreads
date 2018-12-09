import React from 'react'
import { Route, Link } from 'react-router-dom'

import BookShelf from './BookShelf.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

/** @constructor This is the main class in the Books Application
 *  This application class holds available books loaded from external source
 *  and organized them in to three book shelfs depending on user 'read', 'want to read' or
 *  currently reading a particular books.
 */
class BooksApp extends React.Component {

    constructor(){
        super()
        /**
            This holds the application state
        */
        this.state = {
            /**
             All books in the shelfs
            */
            books: [],
            refresh: false,
        }

    }


    /**
    * @description This function will place the selected book in the targeted book shelf
    * @param shelf - targeted book shelf for the book
    * @param book - the boook which shelf is changed
    */
    onShelfChanged(shelf,book){
        book.shelf=shelf;

        BooksAPI.update(book,shelf);

        let bookFound = this.state.books.find((element)=>{
          return element.id === book.id
        })
        if(bookFound){
          /**
            update state to trigger refresh the view for updated shelf
            for a book already found in a shelf
          */
          this.setState((state) => ({
              refresh: !state.refresh
          }))
        }
        else {
          /**
           only add the books not found in exiting boooks
           to avoid duplication
          */
          this.setState((state) => ({
             books: state.books.concat(book)
          }))
        }

    }

    /**
      @description lifecylce method called after when this component included into the DOM
      Here we invoke the backend API to load the all the books
    */
    componentDidMount() {

        BooksAPI.getAll().then((allbooks) => {
            this.setState((state) => ({
                books: allbooks
            }))
        })

    }

    componentDidUpdate(){

    }

    /**
     * @description renders the application
     */
   render(){
     const shelves = {
        currentlyReading: ['Currently Reading', 'currentlyReading'],
        wantToRead: ['Want to Read', 'wantToRead'],
        read: ['Read', 'read']
      }
        return (

            <div>
                <Route exact path='/' render={()=>(
                    <div className="app">
                    <div className="list-books-content">
                      { Object.keys(shelves).map((shelf) =>
                        <BookShelf key={shelves[shelf][0]} shelfName={shelves[shelf][0]}
                            onShelfChanged={this.onShelfChanged.bind(this)}
                            books={
                                this.state.books.filter( (book)=> book.shelf.valueOf() === shelves[shelf][1])
                          }/>
                      )}
                    </div>

                        <div className="open-search">
                            <Link className='open-search' to='/search'>Add a book</Link>
                        </div>
                    </div>
                    )
                }/>
                <Route exact path='/search' render={()=>(
                    <div className="app">
                        <SearchBooks shelfName="Available books"
                          books={this.state.books}
                          onShelfChanged={this.onShelfChanged.bind(this)}/>
                   </div>
                    )
                }/>
            </div>
        )
    }
}
export default BooksApp
