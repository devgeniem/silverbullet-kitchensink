import React from 'react';
import {connect} from 'react-redux';
import {Form, Grid, FormControl, ControlLabel, Button, Glyphicon, Row, Col, Well} from 'react-bootstrap';
import {saveItem} from '../actions/createListActions';

class CreateList extends React.Component {

  static propTypes = {
    saveItem: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
  }

  handleSaveButton(name) {
    console.log('handleState', name);
    this.props.saveItem(name);
    this.setState({inputVal: ''});
  }

  render() {

    var {inputs} = this.props;

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
              {inputs.map(input => {
                  return (
                    <Row key={input.id}></Row>
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
                  <Button bsStyle="primary">
                    <Glyphicon onClick={() => this.handleSaveButton(this.state.inputVal)}
                               glyph="plus"/>
                  </Button>
                </Col>
              </Row>

            </Well>

            <Row>
              <Col xs={12}>
                <Button bsStyle="success">
                  <Glyphicon glyph="save"/> Save</Button>
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
    inputs: state.createList ? state.createList.inputs : [],
  };
}

export default connect(mapStateToProps, {
  saveItem
})(CreateList);
