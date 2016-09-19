import React from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Row, Col, Grid, ListGroup} from 'react-bootstrap';
import List from './List';

class Lists extends React.Component {

  render() {

    var AddNewButton = (<Button><Glyphicon glyph="plus"/> Add a new list</Button>);
    var {lists} = this.props;

    if (lists && lists.map) {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <ListGroup>
                {lists.map(list => {
                    return (<List id={list.id}
                                  key={list.id}>{list.name}</List>)
                  }
                )}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}> { AddNewButton }</Col>
          </Row>
        </Grid>
      );

    } else {
      return (
        <Grid>
          <Row>
            <Col xs={12}>You haven't got any lists, man</Col>
          </Row>
          <Row>
            <Col xs={12}>{ AddNewButton }</Col>
          </Row>
        </Grid>);
    }
  }
}

function mapStateToProps(state) {
  return {
    lists: state.list ? state.list.lists : [],
  };
}

export default connect(mapStateToProps, {})(Lists);
