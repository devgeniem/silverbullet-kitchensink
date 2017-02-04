import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Glyphicon, Row, Col, Grid, ListGroup } from 'react-bootstrap';
import ListItem from '../../components/ListItem';
import { ListActions } from '../../actions';


const mapStateToProps = state => ({
  lists: state.todo.lists,
});

@connect(mapStateToProps)
@translate('todo')
export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: props.lists,
    };
  }

  static propTypes = {
    t: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    lists: React.PropTypes.array,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static defaultProps = {
    lists: [],
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
    const headerClass = (lists.length > 0) ? 'todo-button list-header' : 'todo-button';

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
        <Row>
          <Col xs={12}> { AddNewButton }</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ListGroup>
              {
                lists && lists.map ?
                  lists.map(list => this.renderTodoListItem(list)) :
                  t('no_lists')
              }
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderTodoListItem(list) {
    const listPath = '/list/';
    return (
      <ListItem
        key={list.id}
        href={listPath + list.id}
        date={list.updatedAt}
        allowNavigation
        removeFn={()=>this.handleListRemoval(list.id)}
      >
        {list.title}
      </ListItem>
    );
  }
}
