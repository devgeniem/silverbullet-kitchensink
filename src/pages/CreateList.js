import React from 'react';
import {connect} from 'react-redux';
import {Form, Grid, FormControl, ControlLabel, Button, Glyphicon, Row, Col, Well} from 'react-bootstrap';
import {saveItem, removeItem} from '../actions/createListActions';

import ModalShareList from './ModalShareList';
import TodoListItem from './TodoListItem';

class CreateList extends React.Component {

  static propTypes = {
    saveItem: React.PropTypes.func.isRequired,
    removeItem: React.PropTypes.func.isRequired
  };

  constructor(props) {

    super(props);
    this.state = {
      inputVal: ''
    };
  }

  handleSaveButton(name) {
    this.props.saveItem(name);
    this.setState({inputVal: ''});
  }

  handleItemRemoval(id) {
    this.props.removeItem(id);
  }


  render() {
    var {items} = this.props;

    return (
      <div>
        <Grid>

          <h1>Create a new list</h1>

          <Form>

            <Row>
              <Col xs={12}>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"/>
              </Col>
            </Row>

            <br />

            <Well>
              <ControlLabel>Items</ControlLabel>
              {items.map(item => {
                  return (
                    <TodoListItem key={item.id}
                                  removeFn={(e) => this.handleItemRemoval(item.id)}
                                  id={item.id}>{item.name}</TodoListItem>
                  );
                }
              )}

              <Row className="item-input-row">

                <Col xs={11}>
                  <FormControl value={this.state.inputVal}
                               type="text"
                               onChange={(e) => this.setState({inputVal: e.target.value})}/>
                </Col>

                <Col xs={1}>
                  <Button bsStyle="primary"
                          onClick={() => this.handleSaveButton(this.state.inputVal)}>
                    <Glyphicon glyph="plus"/>
                  </Button>
                </Col>
              </Row>
            </Well>


            <Row>
              <Col xs={1}>
                <Button bsStyle="success">
                  <Glyphicon glyph="save"/> Save</Button>
              </Col>
              <Col xs={1}>
                <ModalShareList></ModalShareList>
              </Col>
            </Row>
          </Form>

        </Grid>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.createList ? state.createList.items : [],
  };
}

export default connect(mapStateToProps, {
  saveItem, removeItem
})(CreateList);
