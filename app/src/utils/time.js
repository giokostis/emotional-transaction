import _ from 'lodash';
import moment from 'moment';

export function getDayEmotionalTransactions (emotionalTransactions) {
    const groupedByDay = _.groupBy(emotionalTransactions, (emotionalTransaction) => {
      return moment(emotionalTransaction.created).startOf('day').format();
    });
    const dayEmotionalTransactions = _.map(groupedByDay, (emotionalTransactions, day) => {
      return {
          day,
          emotionalTransactions
      }
    });
    return dayEmotionalTransactions;
}