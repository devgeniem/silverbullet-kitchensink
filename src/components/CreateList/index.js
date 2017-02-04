import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Form, Grid, FormControl, Button, Glyphicon, Row, Col, FormGroup } from 'react-bootstrap';

// FIXME: we should maybe pick one? :)
import R from 'ramda';
import _ from 'lodash';

import { ListActions } from '../../actions';
import ListItem from '../../components/ListItem';
import ShareList from '../../components/ShareList';


class CreateList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.objectOf({
      listId: React.PropTypes.string,
    }),
    todos: React.PropTypes.array,
  };

  static defaultProps = {
    params: {},
    todos: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      itemTitle: '',
      items: [],
      existingItem: false,
    };
  }

  saveDisabled() {
    return !(this.state.listTitle &&
    this.state.items.length !== 0);
  }

  componentDidMount() {
    if (this.props.params) {
      var itemId = this.props.params.listId;
      var existingItem = R.find(obj=> obj.id === itemId, this.props.todos);
      if (!existingItem) return;
      this.setState({
        listTitle: existingItem.title,
        existingItem: existingItem,
        items: existingItem.items,
      });
    }
  }

  navigateTo(url) {
    this.context.router.push(url);
  }

  // Fixes an issue with controllable/uncontrollable inputs. You might
  // wanna check if there's better way of doing this
  getListTitle() {
    return this.state.listTitle || '';
  }

  handleSaveButton() {
    var items = this.state.items;
    var title = this.state.listTitle;
    var { dispatch } = this.props;
    var data = { title, items };
    let promise;

    if (this.state.existingItem) {
      const id = this.state.existingItem.id;
      promise = ListActions(dispatch).modifyList(id, data);
    } else {
      promise = ListActions(dispatch).createList(data);
    }
    promise.then(() => {
      this.navigateTo('/');
    });
  }

  handleAddItemButton(title) {
    if (title) {
      var item = {
        title,
        id: uuid.v1(),
      };
      this.setState({
        items: R.append(item, this.state.items),
      });
    }

    this.setState({ itemTitle: '' });
  }


  handleItemRemoval(item) {
    var tempItems = this.state.items;

    _.remove(tempItems, tempItem => tempItem.id === item.id);

    this.setState({
      items: tempItems,
    });
  }


  renderTodoListItem(item) {
    return (
      <ListItem
        key={item.id}
        date={item.updatedAt}
        allowNavigation
        removeFn={()=>this.handleItemRemoval(item.id)}
      >
        {item.title}
      </ListItem>
    );
  }

  render() {
    const { items, listTitle } = this.state;
    const pageTitle = this.props.params.listId ? 'Edit list ' + (listTitle || '') : 'Create a new list';

    return (
      <div className="todo-create-list-container">
        <Grid>
          <h1>{pageTitle}</h1>
          <Form>
            <FormGroup>
              <Row>
                <Col xs={12}>
                  <FormControl
                    value={this.getListTitle()}
                    type="text"
                    placeholder="Enter title"
                    onChange={e => this.setState({ listTitle: e.target.value })}
                  />
                </Col>
              </Row>
              <br />
              <Row className="todo-create-list-add-item-container">
                <Col xs={12}>
                  <FormControl
                    value={this.state.itemTitle}
                    type="text"
                    placeholder="Item title"
                    onChange={e => this.setState({ itemTitle: e.target.value })}
                  />
                  <Button
                    className="todo-create-list-add-item-button"
                    disabled={!this.state.itemTitle}
                    onClick={() => this.handleAddItemButton(this.state.itemTitle)}
                  >
                    <Glyphicon glyph="plus" />
                  </Button>
                </Col>
              </Row>
              {items.length > 0 ?
                <div className="todo-create-list-items-container">
                  {
                    items && items.map ?
                    items.map(item => this.renderTodoListItem(item)) : null
                  }
                </div>
                : null }
              <Row className="todo-create-list-control-buttons">
                <Col xs={12}>
                  <Button
                    className="todo-button"
                    onClick={() => this.handleSaveButton()}
                    disabled={this.saveDisabled()}
                  >

                    <Glyphicon glyph="save" /> Save</Button>
                  <ShareList />
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo.lists,
  };
}

export default connect(mapStateToProps)(CreateList);
