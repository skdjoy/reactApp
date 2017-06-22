"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware,createStore} from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';
/* Import Actions */
import {addToCart} from './actions/cartActions'
import {postBooks,updateBooks,deleteBooks} from './actions/booksActions'

const middleware = applyMiddleware(logger);
const store = createStore(reducers,middleware);

import BooksList from './components/pages/booksList';

render(
	<Provider store={store}>
		<BooksList/>
	</Provider>,document.getElementById('app')
);

/* Books Action */

store.dispatch(postBooks(
	[{
		 id: 1,
		 title:'this is the book title',
		 description: 'this is the book description',
		 price: 33.33
	 },
	 {
		 id: 2,
		 title:'this is the second book title',
		 description: 'this is the second book description',
		 price: 50
	 }]
));

// store.dispatch(deleteBooks(
// 	{id : 1}
// ));

// store.dispatch(updateBooks(
// 	{
// 		id : 2,
// 		title : "Learn React in 24h"
// 	}
// ));

// /* Cart Actions */

// store.dispatch(addToCart([{id:1}]));
