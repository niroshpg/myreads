import React from 'react'
import { Route ,Link} from 'react-router-dom'

import './App.css'
import BookShelf from './BookShelf.js'

import SearchBooks from './SearchBooks.js'

import * as BooksAPI from './BooksAPI'

/** @constructor This is the main class in the Books Application
 *  This application class holds available books loaded from external source 
 *  and organized them in to three book shelfs depending on user 'read', 'want to read' or
 *  currently reading a particular books.
 */
class BooksApp extends React.Component {
    /**
     This holds the application state  
    */
    state = {
        /**
         All books in the shelfs 
        */
        books: []
    }

    /**
    * @description This function will place the selected book in the targeted book shelf
    * @param shelf - targeted book shelf for the book
    * @param book - the boook which shelf is changed
    */
    onShelfChanged(shelf,book){
        book.shelf=shelf;
            
        this.setState((state) => ({
            books: state.books.concat(book)
        }))
        
        console.log('shelf changed !' + 'num = ' + JSON.stringify(this.state.books.length))
    }

    /**
      @description lifecylce method called after when this component included into the DOM
      Here we invoke the backend API to load the all the books 
    */
    componentDidMount() {
        
        BooksAPI.getAll().then((books) => {
            this.setState((state) => ({
                books: books.map((aBook)=> {
                    aBook.shelf = 'none' ; return aBook; 
                })
            }))
        })
        
    }
  
    /**
     * @description renders the application 
     */
    render(){
        return (
              
            <div>
                <Route exact path='/' render={()=>(
                    <div className="app">
                        <BookShelf shelfName="Currently Reading" onShelfChanged={this.onShelfChanged.bind(this)} 
                            books={
                                this.state.books.filter( (book)=> book.shelf.valueOf() == 'currentlyReading')
                            }/>
        
                        <BookShelf shelfName="Want To Read" onShelfChanged={this.onShelfChanged.bind(this)} books={this.state.books.filter( (book)=> book.shelf.valueOf() == 'wantToRead')}/>
                        
                        <BookShelf shelfName="Read" onShelfChanged={this.onShelfChanged.bind(this)} books={this.state.books.filter( (book)=>book.shelf.valueOf() == 'read')}/>

                        <div className="open-search">
                            <Link className='open-search' to='/search'>Add a book</Link>
                        </div>
                    </div>
                    )
                }/>
                <Route exact path='/search' render={()=>(
                    <div className="app">
                        <SearchBooks shelfName="Available books" books={this.state.books} onShelfChanged={this.onShelfChanged.bind(this)}/>
                   </div>
                    )
                }/>
            </div>  
        )  
    }
}
export default BooksApp