import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { updateEmotionalTransaction } from '../../store';
import { getFormattedAmountForCurrency } from '../../utils/currency'
import './EmotionalTransaction.css';
import { availableEmojis } from '../../constants/index';

class EmotionalTransaction extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emojiPickerOpen: false
    }
  }

  handleClickEmoji(e) {
    e.stopPropagation();
    const updatedEmotionalTransaction = { id: this.props.id, emotion: e.target.id };
    this.props.updateEmotionalTransaction(updatedEmotionalTransaction);
    this.setState({ emojiPickerOpen: false });
  }

  render() {

    const { description, emotion, currency, amount } = this.props;
    const { emojiPickerOpen } = this.state;

    const formattedAmount = getFormattedAmountForCurrency(Math.abs(amount), currency);
    const emojiObject = _.find(availableEmojis, { name: emotion });
    const emoji = emojiObject ? emojiObject.emoji : '';

    const finalAmountDisplay = amount > 0 ? `+${formattedAmount}` : formattedAmount;
    const amountStyle = amount > 0 ? { color: '#00ccaa'} : null;

    return (
      <div className="emotionalTransactionRow">
        <span> <img className="emotionalTransactionLogo" alt='logo' src='/pizzahut.png' /> </span>
        <span className="emotionalTransactionDescription"> {description} </span>
        <span className="emotionalTransactionRight">
          <span className="emotionalTransactionEmojiContainer"
            onClick={() => this.setState({ emojiPickerOpen: !this.state.emojiPickerOpen }) }>
            { emojiPickerOpen && <div className="emojiPicker">
              {_.map(availableEmojis, (emoji) => (
                  <span key={emoji.key} id={emoji.name} onClick={(e) => this.handleClickEmoji(e)}> {emoji.emoji} </span>
                )
              ) }
            </div> }
            { emoji || <span> + <i className="fas fa-smile"></i></span>}
          </span>
          <span className="emotionalTransactionPrice" style={amountStyle}> {finalAmountDisplay} </span>
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const _updateEmotionalTransaction = bindActionCreators(updateEmotionalTransaction, dispatch);
  return {
    updateEmotionalTransaction: _updateEmotionalTransaction
  };
};

export default connect(null, mapDispatchToProps)(EmotionalTransaction);

