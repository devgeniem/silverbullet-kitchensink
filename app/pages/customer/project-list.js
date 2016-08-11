import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
var s = {}; //import withStyles from 'withStyles';
//import s from './project-list.scss';
import api from '../../services/api';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class ProjectList extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        projects: []
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects() {
        api.get('/projects')
            .then(projects => {
                this.setState({
                    projects: projects
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete(project) {
        if (confirm("Please confirm that you want to permanently DELETE the project?"))
            api.del('/project/'+project.id)
                .then(() => {
                    this.props.addNotification('success', 'Project deleted');
                    this.loadProjects();
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    render() {
        return (
            <div className={s.root}>

                <Button onClick={() => this.context.router.push('/project/new')} bsStyle="primary">Add new project</Button>

                <p></p>

                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map(project =>
                            <tr key={project.id}>
                                <td onClick={() => this.context.router.push('/project/'+project.id)}>{project.name}</td>
                                <td>
                                    <DropdownButton bsSize="xsmall" title="Action" id={`dropdown-action-${project.id}`} pullRight={true}>
                                        <MenuItem onSelect={(key, e) => this.onActionDelete(project)}>Delete</MenuItem>
                                    </DropdownButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification
})(ProjectList), s);
