import React, {PropTypes} from 'react'
import {
  MenuItem,
  InputGroup,
  DropdownButton,
  Image,
  Col,
  Row,
  Well,
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component {

  constructor() {
    super();
    this.state = {
      images :[{}],
      img : ''
    }
  }
  componentDidMount(){
    axios.get('/api/images').then(function(response){
      this.setState({images:response.data});
    }.bind(this))
    .catch(function(err){
      this.setState({images : 'error loading images from the server',img:''});
    }.bind(this))
  }
  handleSubmit() {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        price: findDOMNode(this.refs.price).value
      }
    ]
    this.props.postBooks(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId);
  }

  render() {

    const booksList = this.props.books.map(function(booksArr) {
      return (
        <option key={booksArr._id}>{booksArr._id}</option>
      );
    })

    const imgList = this.state.images.map(function(imgArr,i){
      return(
        <MenuItem key={i} eventKey={imgArr.name}>{imgArr.name}</MenuItem>
      );
    })

    return (
      <Well>
        <Row>
          <Col>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value=""/>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src="" responsive/>
            </Panel>
          </Col>
          <Col>
            <Panel>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" placeholder="Enter Title" ref="title"/>
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl type="text" placeholder="Enter Description" ref="description"/>
              </FormGroup>
              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl type="text" placeholder="Enter Price" ref="price"/>
              </FormGroup>
              <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
            </Panel>
            <Panel style={{
              marginTop: '25px'
            }}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state) {
  return {books: state.books.books}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks,
    deleteBooks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
