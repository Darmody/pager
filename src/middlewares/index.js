import sagaMiddleware from './sagaMiddleware'

const middlewares = [
  sagaMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger')())
}

export default middlewares
