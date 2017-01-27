import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Glyphicon, Row, Col, Grid, ListGroup } from 'react-bootstrap';
import ListItem from '../../components/ListItem';
import Actions from '../../actions/Creators';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: props.lists,
    };
    console.log("lists", props.lists);
  }


  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    lists: React.PropTypes.array,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    Actions(dispatch).refreshLists();
  }

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

  handleListRemoval(id) {
    const { dispatch } = this.props;
    Actions(dispatch).deleteList(id).then(Actions(dispatch).refreshLists);
  }

  render() {
    const { lists, t } = this.props;
    const listPath = '/create-list';

    var headerClass = (lists.length > 0) ? 'todo-button list-header' : 'todo-button';

    var AddNewButton = (


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
                  "You haven't got any lists, man"
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

function mapStateToProps(state) {
  return {
    lists: state.todo.lists,
  };
}

export default connect(mapStateToProps)(translate(["todo"])(Todo));
