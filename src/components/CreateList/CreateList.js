import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Form, Grid, FormControl, Button, Glyphicon, Row, Col, FormGroup, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';
// FIXME: we should maybe pick one? :)
import R from 'ramda';
import _ from 'lodash';

import { ListActions } from '../../actions';
import { ListItem } from '../../components';

const mapStateToProps = (state) => {
  return {
    todos: state.todo.lists,
    error: state.todo.error,
  };
};


@translate(['common', 'todo'])
@connect(mapStateToProps)
export default class CreateList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    t: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.shape({
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
      error: null,
    };
  }

  saveDisabled() {
    return !(this.state.listTitle &&
    this.state.items.length !== 0);
  }

  componentDidMount() {
    if (this.props.params) {
      const itemId = this.props.params.listId;
      const existingItem = R.find(obj=> String(obj.id) === itemId, this.props.todos);
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
    const items = this.state.items;
    const title = this.state.listTitle;
    const { dispatch } = this.props;
    const data = { title, items };
    let promise = null;

    if (this.state.existingItem) {
      const id = this.state.existingItem.id;
      promise = ListActions(dispatch).modifyList(id, data);
    } else {
      promise = ListActions(dispatch).createList(data);
    }

    promise.then((response) => {
      if (!response.error) {
        this.navigateTo('/');
      }
      this.setState({ error: response.error });
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


  handleItemRemoval(itemId) {
    const tempItems = this.state.items;
    _.remove(tempItems, tempItem => tempItem.id === itemId);

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
    const { t, params } = this.props;
    const { items, listTitle, error } = this.state;
    const pageTitle = params.listId ? t('edit_list') + ' ' + (listTitle || '') : t('add_new_list');
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
                    placeholder={t('enter_title')}
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
                    placeholder={t('item_title')}
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

                    <Glyphicon glyph="save" />{t('save')}</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
          {error &&
            <Row>
              <Col>
                <Alert bsStyle="danger">
                  <strong>{error.code}</strong>: {error.reason}
                </Alert>
              </Col>
            </Row>
          }
        </Grid>
      </div>
    );
  }
}
