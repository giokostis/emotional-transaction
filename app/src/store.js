import { createStore } from 'redux'
let initState = {
  emotionalTransactions: []
}

function reducer (state = initState, action) {
  switch (action.type) {

    case 'LOAD_LIST':
      return {
        ...state,
        emotionalTransactions: action.payload,
      }

    case 'UPDATE_SINGLE':
      return {
        ...state,
        emotionalTransactions: state.emotionalTransactions
          .map(emotionalTransaction =>
            emotionalTransaction.id === action.payload.id
              ? { ...emotionalTransaction, ...action.payload }
              : emotionalTransaction
          )
      }

    default:
      return {
        ...state
      }

  }
}

function loadEmotionalTransactionsList (payload) {
  return {
    type: 'LOAD_LIST',
    payload,
  }
}

function updateEmotionalTransaction (payload) {
  return {
    type: 'UPDATE_SINGLE',
    payload,
  }
}

let store = createStore(reducer)
export { store, loadEmotionalTransactionsList, updateEmotionalTransaction }