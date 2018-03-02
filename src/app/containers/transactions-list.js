import React from 'react'
import matchSorter from 'match-sorter'
import { connect } from 'react-redux'
import { getTransactions} from '../actions/transaction'

// Import React Table
import ReactTable from "react-table"
import "react-table/react-table.css"

class TransactionsList extends React.Component {

  componentDidMount() {
    this.props.getTransactions()
  }

  onRowClick(transaction) {
    this.props.onRowClick(transaction)
  }

  render() {
    const { transactions } = this.props
    const columns = [{
      Header: 'Date/Time',
      accessor: 'date',
      filterAll: true
    }, {
      Header: 'Username',
      accessor: 'username',
      filterAll: true
    }, {
      Header: 'Amount',
      accessor: 'amount',
      filterAll: true,
      Cell: props => <span className='number'>{props.value}</span>
    }, {
      Header: 'Balance',
      accessor: 'balance',
      filterAll: true,
      Cell: props => <span className='number'>{props.value}</span>
    }]
    return (
      <ReactTable
        className="container"
        data={transactions}
        columns={columns}
        defaultPageSize={10}
        filterable
        defaultFilterMethod={(filter, row) =>
          matchSorter(row, filter.value, { keys: [filter.id] })
        }
        getTrProps={(state, rowInfo) => {
            return {
                onClick: (e) => {
                  this.props.modal && this.onRowClick(rowInfo.original)
                }
            }
        }}
      />
      )
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transaction.trans_token
  }
}

const mapDispatchToProps = {
  getTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)
