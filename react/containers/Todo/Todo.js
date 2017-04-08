import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Glyphicon, Row, Col, Grid, ListGroup } from 'react-bootstrap';
import { ListItem } from '../../components';
import { ListActions } from '../../actions';

const mapStateToProps = state => ({
  lists: state.todo.get('lists'),
});

@connect(mapStateToProps)
@translate('todo')
export default class Todo extends React.Component {

  static propTypes = {
    t: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    lists: ImmutablePropTypes.list.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    ListActions(dispatch).refreshLists();
  }

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

  handleListRemoval(id) {
    const { dispatch } = this.props;
    ListActions(dispatch).deleteList(id).then(ListActions(dispatch).refreshLists);
  }

  render() {
    const { lists, t } = this.props;
    const listPath = '/create-list';
    const headerClass = (lists.size > 0) ? 'todo-button list-header' : 'todo-button';

    const AddNewButton = (
      <Button
        href={listPath}
        className={headerClass}
        onClick={e => this.navigateTo(e, listPath)}
      >
        <Glyphicon glyph="plus" /> {t('add_new_list')}
      </Button>
    );

    return (
      <Grid className="todo-main-container">
        {lists.size === 0 ? <h2 className="text-center">{t('no_lists')}</h2> : null}
        <Row>
          <Col xs={12}> { AddNewButton }</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ListGroup>
              { lists.map(this.renderTodoListItem) }
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderTodoListItem = (list) => {
    const listPath = '/list/';
    return (
      <ListItem
        key={list.get('id')}
        href={listPath + list.get('id')}
        date={list.get('updatedAt')}
        allowNavigation
        removeFn={()=>this.handleListRemoval(list.get('id'))}
      >
        { list.get('title') }
      </ListItem>
    );
  }
}
