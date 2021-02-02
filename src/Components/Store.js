import React, { Component } from 'react'
import NavWeb from './Nav';
import { withRouter } from 'react-router-dom';
import { Card, Button, Modal, Alert } from 'react-bootstrap/';
import '../index.css';
import '../CSSWeb/Store.css'
import cart from '../images/cart.png';


class StoreTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      modalShow: false
    }
  }

  inputTeam = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  SetModalShow = () => {
    this.setState({ modalShow: true });
  }
  SetCloseModal = () => {
    this.setState({ modalShow: false })
  }


  sendItemToCart = (id) => {
    this.props.addToCart(id)
  }


  HandleConfirmOrder = () => {
    this.props.ConfirmOrder()
  }

  RemoveItem = (id) => {
    this.props.RemoveItem(id)
  }

  handleIncrement = (id) => {
    this.props.handleIncrement(id)
  }
  handleDecrement = (id) => {
    this.props.handleDecrement(id)
  }

  render() {
    console.log(this.state.searchInput)
    return (<div>
      <NavWeb />
      <br />
      <div>
        <>
          <Button variant="btn-container secondary" onClick={this.SetModalShow}>
            <span style={{ color: 'red', fontSize: '1rem', fontWeight: 'bold' }}>{this.props.cartItems.length}</span>
            <img style={{ position: 'absolute', top: '', left: '5.8%' }} className="cart" src={cart} />
          </Button>

          <Modal
            show={this.state.modalShow}
            onHide={this.SetCloseModal}
            backdrop="static"
            keyboard={false}
          >
            <div style={{ backgroundColor: 'rgba(117, 133, 145, 0.1)' }}>
              <Modal.Header >
                <Modal.Title>סל הקניות</Modal.Title>
                <Button size="sm" variant="secondary" onClick={this.SetCloseModal}>X</Button>
              </Modal.Header>
              <Modal.Body >
                <div>
                  {this.props.cartItems.map((item, index) => {
                    return <div key={index}>
                      <p style={{ textAlign: 'right' }}>
                        <b style={{ marginLeft: 20 }}>
                          שם מוצר: {item.prod} <br />
                          מחיר הפריט: ₪{item.cost}
                          כמות: {item.quantity}
                        </b>
                        <img width="11%" height="3%" src={item.src}></img>
                        <Button className="btn btn-sm m-4" variant="danger"
                          onClick={() => this.RemoveItem(item.id)}>הסר</Button></p>
                    </div>
                  })}
                </div>
                <b><p>סכום לתשלום: {this.props.total_price}₪ </p></b>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="success" onClick={this.HandleConfirmOrder}>לתשלום</Button><br /><br />
                <Alert id="su" variant="success" style={{ display: 'none' }} />
                <Alert id="wr" variant="danger" style={{ display: 'none' }} />
              </Modal.Footer>
            </div>
          </Modal>
        </>
      </div>
      <div style={{ textAlign: 'right' }}>
        <b>חיפוש מוצר על פי קבוצה :</b> <input style={{ height: '28px' }} type="text" onChange={this.inputTeam} />
      </div>
      <h2 style={{ textAlign: 'center' }}>חנות האוהדים</h2>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 20, }}>
          {this.state.searchInput === '' && this.props.items.map((item, index) =>
            <Card style={{ width: '15rem', marginLeft: '3rem', textAlign: 'center', marginBottom: '5rem' }} key={index}>
              <Card.Body>
                <Card.Img variant="top" src={item.src} height="200" />
                <Card.Title>{item.prod}</Card.Title>
                <Card.Text><b>₪{item.cost} ש"ח<br />
                  <Button variant='transpert' size='sm' onClick={() => this.handleIncrement(item.id)}>+</Button>
                  {item.quantity}
                  <Button variant='transpert' size='sm' onClick={() => this.handleDecrement(item.id)}>-</Button></b>
                </Card.Text>
                <Button variant="success" onClick={() => this.sendItemToCart(item.id)}>הוסף לעגלה</Button>
              </Card.Body>
            </Card>
          )}
          {this.state.searchInput !== '' && this.props.items.filter(item => item.team_name.includes(this.state.searchInput)).map((item, index) => {
            return <Card style={{ width: '15rem', marginLeft: '3rem', textAlign: 'center', marginBottom: '5rem' }} key={item.id}>
              <Card.Body>
                <Card.Img variant="top" src={item.src} height="200" />
                <Card.Title>{item.prod}</Card.Title>
                <Card.Text><b>₪{item.cost} ש"ח <br />
                  <Button variant='transpert' size='sm' onClick={() => this.handleIncrement(item.id)}>+</Button>
                  {item.quantity}
                  <Button variant='transpert' size='sm' onClick={() => this.handleDecrement(item.id)}>-</Button></b>
                </Card.Text>
                <Button variant="success" onClick={() => this.sendItemToCart(item.id)}>הוסף לעגלה</Button>
              </Card.Body>
            </Card>
          })}
        </div>
      </div>
    </div>);
  }
}


export default withRouter(StoreTeams);