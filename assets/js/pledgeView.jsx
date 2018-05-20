import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

export default class PledgeView extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: null,
      list: [],
    };
    this.state.currentIndex = 0;
    this.state.currentItem = this.state.list[this.state.currentIndex];
    this.state.acceptedItems = [];
    this.state.rejectedItems = [];

    // Modal
    this.state.modalIsOpen = false;
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    fetch('/needs')
      .then(res => {
        return res.json();
      })
      .then(res => {
        let list = res;
        if (list.length > 0) {
          this.setState({items: list});
          this.setState({
            currentIndex: 0,
            currentItem: list[0],
            // list: res,
          });
        }
      })
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  getNextIndex() {
    let index = this.state.currentIndex;
    return (++index === this.state.list.length) ? 0 : index;
  }
  getNextItem() {
    let currentIndex = this.getNextIndex();
    this.setState({
      currentIndex: currentIndex,
      currentItem: this.state.list[currentIndex],
    });
  }
  rejectAction() {
    this.getNextItem();
  }
  approveAction() {
    postData('/pledges/', JSON.stringify({})).then(res => {
      return res;
    });
    // this.closeModal();
    // this.getNextItem();
  }
  approveForm() {
    this.setState({
      modalIsOpen: true
    });
  }
  renderItem() {
    if (this.state.list.length > 0) {
      return (
        <Item
          item={this.state.currentItem}
          approveAction={this.approveAction.bind(this)}
          approveForm={this.approveForm.bind(this)}
          rejectAction={this.rejectAction.bind(this)}
        />
      )
    } else {
      return (<div>Loading...</div>);
    }
  }
  render () {
    return (
      <div className={"pledge-container"}>
        {this.renderItem()}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal.bind(this)}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal.bind(this)}>close</button>
          <ItemForm
            approveAction={this.approveAction.bind(this)}
          />
        </Modal>
    </div>);
  }
}

class Item extends Component {
  render() {
    return (<div>
      <Image src={this.props.item.image}/>
      <h3>{this.props.item.name}</h3>
      <div>Quantity Needed: {this.props.item.quantity}</div>
      <div className={"item-buttons-container"}>
        <button onClick={this.props.rejectAction}>Reject</button>
        <button onClick={this.props.approveForm}>Approve</button>
      </div>
    </div>);
  }
}


class Image extends Component {
  render() {
    return <div className={"image-container"}>
      <img src={this.props.src}/>
    </div>
  }
}

class ItemForm extends Component {
  render() {
    return (<div>
      <form>
        <input type={"number"}/>
        <button onClick={this.props.approveAction}>Submit</button>
      </form>
    </div>);
  }
}
