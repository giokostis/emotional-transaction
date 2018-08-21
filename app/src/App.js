import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import EmotionalTransaction from './components/EmotionalTransaction/index';
import { loadEmotionalTransactionsList } from './store';
import { getDayEmotionalTransactions } from './utils/time';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emotionalTransactions: [],
      searchFilter: '',
      error: false,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    // For the purposes of this demo we hardcode the API endpoint.
    axios.get('http://localhost:3005/emotional-transactions')
      .then((emotionalTransactions) => {
        this.props.loadEmotionalTransactionsList(emotionalTransactions.data);
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log('Error:', error);
        this.setState({ error: true });
      })
  }

  render() {

    const { searchFilter, error, loading } = this.state;
    const { emotionalTransactions } = this.props;

    if (error) {
      return (<div> There was an error loading the content... </div>)
    }

    if (loading) {
      return (<div> Loading... </div>)
    }

    const filteredEmotionalTransactions = emotionalTransactions.filter((emotionalTransaction) => emotionalTransaction.description &&
      emotionalTransaction.description.toLowerCase().indexOf(searchFilter.toLowerCase()) > -1 );

    const dayEmotionalTransactions = getDayEmotionalTransactions(filteredEmotionalTransactions);

    return (
      <div className="App">
        <input type='text' placeholder='&#xF002; Search Transactions' className="searchBar"
          value={searchFilter} onChange={(e) => this.setState({ searchFilter: e.target.value })}/>
        {dayEmotionalTransactions.map(({ emotionalTransactions, day }) => {
          return (
            <div key={day}>
              <div className="dayIndication"> { moment(day).format('dddd, D MMMM') } </div>
              {emotionalTransactions.map((emotionalTransaction) => {
                return (
                  <EmotionalTransaction
                    amount={emotionalTransaction.amount}
                    description={emotionalTransaction.description}
                    emotion={emotionalTransaction.emotion}
                    key={emotionalTransaction.id}
                    id={emotionalTransaction.id}
                    created={emotionalTransaction.created}
                    currency={emotionalTransaction.currency}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emotionalTransactions: state.emotionalTransactions
  };
};

const mapDispatchToProps = (dispatch) => {
  const _loadEmotionalTransactionsList = bindActionCreators(loadEmotionalTransactionsList, dispatch);
  return {
    loadEmotionalTransactionsList: _loadEmotionalTransactionsList
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
