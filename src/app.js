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
