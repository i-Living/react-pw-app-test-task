import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import TransactionsList from './transactions-list'

import '../styles/transaction.css'
import searchIcon from '../styles/search.svg'
import { getTransactions, createTransaction } from '../actions/transaction'
import { filterUsers, getUser } from '../actions/user'

ReactModal.setAppElement('#root')

class Transaction extends React.Component {
  constructor () {
    super();
    this.state = {
      recipient: '',
      amount: '',
      showModal: false,
      showNotification: false,
      showUsers: false,
      lowCash: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onCloseNotification = this.onCloseNotification.bind(this)
    this.onHistoryGet = this.onHistoryGet.bind(this)
    this.onRecipientChange = this.onRecipientChange.bind(this)
    this.onBlurEvent = this.onBlurEvent.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.onSelectRecipient = this.onSelectRecipient.bind(this)
  }

  /**
   * On open modal function.
   * @return {[state]} New showModal state
   */
  onOpenModal () {
    this.props.getTransactions()
    this.setState({ showModal: true })
  }

  /**
   * On close modal function.
   * @return {[state]} New closeModal state
   */
  onCloseModal () {
    this.setState({ showModal: false })
  }

  /**
   * On close notification  function.
   * @return {[state]} New showNotification state
   */
  onCloseNotification () {
    this.setState({ showNotification: false })
  }

  /**
   * Updates recipient state from input. Shows filtered users.
   * @param  {[event]} event Input event
   * @return {[state]} New recipient, showUsers state
   */
  onRecipientChange (event) {
    this.setState({recipient: event.target.value, showUsers: true})
    if (event.target.value.length)
      this.props.filterUsers(event.target.value)
  }

  /**
   * Select user from list.
   * @param  {[event]} event Click event
   * @return {[state]} New recipient, showUsers state
   */
  onSelectRecipient (event) {
    this.setState({recipient: event.target.text, showUsers: false})
  }

  /**
   * Clears filtered users after left click.
   * @param  {[event]} e Blur event
   * @return {[state]} New showUsers state
   */
  onBlurEvent(e) {
    // TODO: Remove timeout. Add click checking.
    setTimeout(() => this.setState({showUsers: false}), 200)
  }

  /**
   * Updates amount state from input. Allows to send transaction if user balance > transaction amount.
   * @param  {[event]} event Input event
   * @return {[state]} New lowCash, amount state
   */
  onAmountChange (event) {
    const amount = event.target.value
    if (event.target.validity.valid) {
      if (amount > this.props.user.balance) {
        this.setState({lowCash: true, amount: amount})
      } else {
        this.setState({lowCash: false, amount: amount})
      }
    }
  }

  /**
   * Get transaction data from user transaction list.
   * @param  {[object]} data Previous transaction data
   * @return {[state]} New recipient, amount state
   */
  onHistoryGet (data) {
    const amount = Math.abs(data.amount)
    this.setState({recipient: data.username, amount: amount})
    this.onCloseModal()
  }

  /**
   * Create new transaction. Shows success modal window.
   * @param  {[event]} e Form submit event
   * @return {[state]} New showNotification state
   */
  onSubmit(e) {
    e.preventDefault()
    this.props.createTransaction(this.state.recipient, this.state.amount)
    this.setState({showNotification: true})
    setTimeout(() => this.setState({showNotification: false}), 3000)
  }

  render() {
    return (
      <div className="container">
        <h4 className="text-center"> New transaction </h4>
        <form className="form-transaction" onSubmit={this.onSubmit}>
          <label htmlFor="inputRecipient" className="text-left">Recipient</label>
          <div className="input-group">
            <input
              type="text"
              id="inputRecipient"
              className="form-control"
              placeholder="Recipient name"
              autoComplete="off"
              onChange={this.onRecipientChange}
              onBlur={this.onBlurEvent}
              value={this.state.recipient || ''}
            />
            <div className="input-group-append">
              <button className="styled-btn btn btn-outline-secondary" type="button" onClick={this.onOpenModal}>
                <img src={searchIcon} className="search-icon" alt="search" />
              </button>
            </div>
          </div>
          <div className="list-group custom-list-group">
            {(this.props.filteredUsers.length && this.state.showUsers && this.state.recipient.length > 0)
              ? this.props.filteredUsers.map(item => (
                <a className="list-group-item list-group-item-action" key={item.id} onClick={this.onSelectRecipient}>
                  {item.name}
                </a>
              ))
              : <div></div>
            }
          </div>
          <label htmlFor="inputAmount" className="text-left">Amount</label>
          <input
            type="text"
            pattern="[0-9]*"
            id="inputAmount"
            className="form-control"
            placeholder="Transaction amount"
            onChange={this.onAmountChange}
            value={this.state.amount || ''}
          />
          {this.state.lowCash
            ? <div className="text-center text-danger"> Not enough cash</div>
            : <br></br>
          }
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={this.state.lowCash || this.state.recipient === ''}>
            Send
          </button>
        </form>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Transactions List"
          shouldCloseOnOverlayClick={true}
        >
          <button className="btn btn-link text-dark float-right" onClick={this.onCloseModal}>Close</button>
          <TransactionsList onRowClick={this.onHistoryGet} modal={true} transactions={this.props.transactions || []}/>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showNotification}
          contentLabel="Minimal Modal Example"
          shouldCloseOnOverlayClick={true}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <h2>Successfull</h2>
          <button className="btn btn-success btn-block" onClick={this.onCloseNotification}>OK</button>
        </ReactModal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    filteredUsers: state.userList,
    transactions: state.transaction.trans_token
  }
}

const mapDispatchToProps = {
  filterUsers,
  getTransactions,
  createTransaction,
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
