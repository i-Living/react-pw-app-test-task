import React, { Component } from 'react'
import matchSorter from 'match-sorter'

// Import React Table
import ReactTable from "react-table"
import "react-table/react-table.css"

const data = [{
  date: '21.01.2018',
  recipient: 'Tom',
  amount: '5',
  balance: '1575'
},{
  date: '17.01.2018',
  recipient: 'Alex',
  amount: '20',
  balance: '1580'
},{
  date: '15.01.2018',
  recipient: 'Tom',
  amount: '200',
  balance: '1600'
},{
  date: '08.01.2018',
  recipient: 'Bob',
  amount: '150',
  balance: '1800'
}]


class TransactionsList extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  onRowClick(data) {
    this.props.onRowClick(data)
  }

  render() {
    const columns = [{
      Header: 'Date/Time',
      accessor: 'date',
      filterAll: true
    }, {
      Header: 'Recipient',
      accessor: 'recipient',
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
        data={data}
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

export default TransactionsList
