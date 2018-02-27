import React, { Component } from 'react'
import ReactModal from 'react-modal'
import TransactionsList from './transactions-list'

import '../styles/transaction.css'
import searchIcon from '../styles/search.svg'

ReactModal.setAppElement('#root')

class Transaction extends Component {
  constructor () {
    super();
    this.state = {
      recipient: '',
      amount: '',
      showModal: false
    }

    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onHistoryGet = this.onHistoryGet.bind(this)
    this.onRecipientChange = this.onRecipientChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
  }

  onOpenModal () {
    this.setState({ showModal: true })
  }

  onCloseModal () {
    this.setState({ showModal: false })
  }

  onRecipientChange (recipient) {
    this.setState({recipient: recipient})
  }

  onAmountChange (amount) {
    this.setState({amount: amount})
  }

  onHistoryGet (data) {
    console.log(data)
    this.setState({recipient: data.recipient, amount: data.amount})
    this.onCloseModal()
  }

  onSendClick() {

  }

  render() {
    return (
      <div className="container">
        <h4 className="text-center"> New transaction </h4>
        <form className="form-transaction">
          <label htmlFor="inputRecipient" className="text-left">Recipient</label>
          <div className="input-group">
            <input
              type="text"
              id="inputRecipient"
              className="form-control"
              placeholder="Recipient name"
              onChange={this.onRecipientChange}
              value={this.state.recipient || ''}
            />
            <div className="input-group-append">
              <button className="styled-btn btn btn-outline-secondary" type="button" onClick={this.onOpenModal}>
                <img src={searchIcon} className="search-icon" alt="search" />
              </button>
            </div>
          </div>
          <label htmlFor="inputAmount" className="text-left">Amount</label>
          <input
            type="number"
            id="inputAmount"
            className="form-control"
            placeholder="Transaction amount"
            onChange={this.onAmountChange}
            value={this.state.amount || ''}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit"> Send </button>
        </form>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          shouldCloseOnOverlayClick={true}
        >
          <button className="btn btn-link text-dark float-right" onClick={this.onCloseModal}>Close</button>
          <TransactionsList onRowClick={this.onHistoryGet} modal={true}/>
        </ReactModal>
      </div>
    )
  }
}

export default Transaction
