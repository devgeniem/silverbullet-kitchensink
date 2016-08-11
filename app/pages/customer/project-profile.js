import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem, Row, Col, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import EditBubble from '../../components/EditBubble';
import AddNewProjectStatusForm from './forms/add-new-project-status';
var s = {}; //import withStyles from 'withStyles';
//import s from './project-profile.scss';
import api from '../../services/api';
import { formatThousands, getCurrencySymbol } from '../../services/utils';
import moment from 'moment';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class ProjectProfile extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        project: {},
        showEditPencil: {},
        showEdit: {},
        users: [],
    }

    componentDidMount() {
        this.loadProject();
        this.loadUsers();
    }

    loadUsers() {
        api.get('/users')
            .then(users => {
                this.setState({
                    users: users
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadProject() {
        api.get('/project/'+ this.props.params.id)
            .then(project => {
                this.setState({
                    project: project
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

    toggleEdit(attribute) {
        var { showEdit } = this.state;
        showEdit[attribute] = !showEdit[attribute];
        this.setState({
            showEdit: showEdit
        });
    }

    showEditPencil(attribute) {
        var { showEditPencil } = this.state;
        if (!showEditPencil[attribute]) {
            showEditPencil[attribute] = true;
            this.setState({
                showEditPencil: showEditPencil
            });
        }
    }

    hideEditPencil(attribute) {
        var { showEditPencil } = this.state;
        if (showEditPencil[attribute]) {
            showEditPencil[attribute] = false;
            this.setState({
                showEditPencil: showEditPencil
            });
        }
    }

    onActionUpdate(attribute, value) {
        var { project } = this.state;
        var data = {};
        if (attribute === "billing") {
            data[attribute] = value.value;
            data.currency = value.currencyValue;
        } else {
            data[attribute] = value;
        }
        api.put('/project/'+project.id, data)
            .then(() => {
                this.loadProject();
            })
            .catch((err) => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    render() {
        var { formOptions } = this.props;
        var { project, showEdit, showEditPencil, users } = this.state;

        return (
            <div className={s.root}>

                <Row>
                    <Col xs={1}>
                        <h1></h1>
                    </Col>
                    <Col xs={9}>
                        <h3>
                            {project.customer ? <a href={'/customer/'+project.customer.id}>{project.customer.name}</a> : ''}
                        </h3>
                        <h2 onMouseOver={()=>this.showEditPencil('name')} onMouseOut={()=>this.hideEditPencil('name')}>
                            {project.name}
                            <EditBubble
                                key="edit-bubble-name"
                                type="text"
                                label="Name"
                                name="name"
                                value={project.name}
                                show={showEdit.name}
                                showPencil={showEditPencil.name}
                                onSuccess={d => this.onActionUpdate('name', d)}
                                toggleShow={() => this.toggleEdit('name')}
                            />
                        </h2>
                    </Col>
                    <Col xs={2} onMouseOver={()=>this.showEditPencil('state')} onMouseOut={()=>this.hideEditPencil('state')}>
                        <Button bsSize="large">{project.state}</Button>
                        <EditBubble
                                type="dropdown"
                                dropdownValues={formOptions.projectStates}
                                label="State"
                                name="state"
                                value={project.state}
                                show={showEdit.state}
                                showPencil={showEditPencil.state}
                                onSuccess={d => this.onActionUpdate('state', d)}
                                toggleShow={() => this.toggleEdit('state')}
                            />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col xs={9} xsOffset={1}>
                        <h4 onMouseOver={()=>this.showEditPencil('projectManager')} onMouseOut={()=>this.hideEditPencil('projectManager')}>
                            Project manager: {project.projectManager ? project.projectManager.firstname+' '+project.projectManager.lastname : ''}
                            <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Project manager"
                                name="projectManager"
                                value={project.projectManager ? project.projectManager.id : null}
                                show={showEdit.projectManager}
                                showPencil={showEditPencil.projectManager}
                                onSuccess={d => this.onActionUpdate('projectManager', d)}
                                toggleShow={() => this.toggleEdit('projectManager')}
                            />
                        </h4>
                    </Col>
                    <Col xs={2} className="text-right">
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={this.renderProjectInfoPopover(project)}>
                            <a href="#">Info</a>
                        </OverlayTrigger>
                        {' - '}
                        <a href={project.jiraLink}>Project Jira</a>
                    </Col>
                </Row>

                {project.statuses && project.statuses.length ?
                <div>
                    <Row>
                        <Col xs={9} xsOffset={1}>
                            week {moment(project.statuses[0].week).format('WW')} by <a href="#">{project.statuses[0].creator.firstname}</a>
                        </Col>
                        <Col xs={2} className="text-right">
                            <OverlayTrigger trigger="click" rootClose placement="left" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
                                <a href="#">show all statuses</a>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="text-center">{this.renderStateCircle(project.statuses[0].state)}</Col>
                        <Col xs={10}>
                            {project.statuses[0].text}
                        </Col>
                    </Row>
                </div> :
                null }

                <Row>
                    <Col xs={12} className="text-right">
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={this.renderWriteNewStatusPopover(project)}>
                            <a href="#">write new status</a>
                        </OverlayTrigger>
                    </Col>
                </Row>

                {project.invoicings && project.invoicings.length ?
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th className="col-xs-6">Projects</th>
                                        <th className="col-xs-3">tunnit</th>
                                        <th className="col-xs-3">laskutus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.invoicings.map(invoicing =>
                                        <tr key={invoicing.id}>
                                            <td className="col-xs-6">{invoicing.month}</td>
                                            <td className="col-xs-3">{invoicing.hours}</td>
                                            <td className="col-xs-3">{formatThousands(invoicing.amount)} &euro;</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="col-xs-6"><strong>Total</strong></td>
                                        <td className="col-xs-3"><strong>{project.invoicingsTotal.hours}</strong></td>
                                        <td className="col-xs-3"><strong>{formatThousands(project.invoicingsTotal.amount)} &euro;</strong></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row> :
                null }

            </div>
        );
    }

    renderStateCircle(state) {
        var data;
        if (state === 'Green')
            data = 'data:image/png;base64,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';
        if (state === 'Yellow')
            data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyEAYAAABOr1TyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0T///////8JWPfcAAADjElEQVR42u2cTWsTURSGByNS0KBQlP6AiTYtsQtxUbJyp3Qjgitd2P+gdidiJQuRBEpsE1satO2itquGSiUgpqVC0WptEboQNwF11aYNkpaSHBf3HiWJM3PvdOY2MzmzeTcDSc6Tmfsx5xlNU3xsb4+M9PQErrPUV1jeessyFWb5scKymGYJ4E6WjrP89JNleorl7R8sQy/4953U/HLwH6azTCTdLbDbGV/ivyfoMQBdQywXN7wNwCrz/AoOx5sMQNsW/wf1+xuAVSYGeD0KRwRCX2dZfdbaIOqzwm/NoZgiEFHtsF+8eD/1PjIBULqbGdQ3AcrZ6TMddwAOVuf6Tt0AqM4vfA2sAADkcprmfFZ/vbkauARw8Htu6uQ3gPKX6ZsdJwBKTzLz+jBA8WHqe+SxU4B6yy6B6C3b/WI7q6MfwlmA/WuzL9tfu1dop3P/ymyi/TPAztroWnjmsGCijs2SYtJXwIPUZuQpwN7wzOmzy94BYJV7914tnwv9u8LtgdHX7Q7Whdp7ovUH7naPZTrHAeBd7qK24B8QDVnMPde6AXYvj2U7B2WB4JjbtiUJBGcN1h9UOjb+6PwFHwOwSPz9kuuafkEQ4bjwFcH/Ia0Koj7xDiEHpmvIAkg+LTpLwkuXgPDkt2ocQ8WALG4YDd5BUbI4uBEIg8GfT2bkrpSQXgcE92pMpq98+keFF0uc7guu9JO4+zopShLn5VRwwXUMX3eJ1ler3WY2GTP4ypUKbS8lgeD+v8m0lm8pUIGVAMEHM8Yn4l4PFVgJEHxiZnwibsJRgZUAwUeZxifi7igVWAkQ6xOpsASEgBAQAkJACAgBoSQgBISSgBAQKiwBaVkg1m3/bncSEpAaIOhjmOz28hZPKrASICjKmDwP4b23VGAlQNBgMnliyJuiqcBKgKBaJtCHRQVWAQSdP4GuE491rzdL97wwkLpe3qSoVkAFF+zLktIY4ksGcqZA56LPNAO3tAXJzsWgQUuptayJvau+1w5sagpy/kg+LWjRSvggBIR1v9vyRQQsXlmrlvwQO35IYsCm7ixu2f71RfyuKfBbtT0fBI00G/p0rf4sb9n6TVvAyYyc/9EweMeOXIfG6Z/Xuudx3SWnFXhIj27NjKp6kwPq0pUkFf5/lq0N/dmhd50UZK1dfybOSiV0ZzWA0OLNp/0NABfQJhZtk74vKyjqMDb5236SDXKmw8cf+5807r+DELIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDYtMDdUMDA6MTk6MzArMDI6MDBxsM1LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA2LTA3VDAwOjE5OjMwKzAyOjAwAO119wAAAABJRU5ErkJggg==';
        if (state === 'Red')
            data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyEAYAAABOr1TyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0T///////8JWPfcAAADP0lEQVR42u2cMU8bMRTHT2kVEVCQIkYY70A5KewhXyALqHtZ+AKIjW/AeEHoipIJVaLfgalSQAyVqg4wwhYp3VClDkzXFMd+FUmI79k5uznnHRL/yYnv/WL72ff+53mWr8GA/X/3gav/jevHr1zbVa7fE66/OlwHAzP6+z3XHz+5dr5w3e9zDT6L/l56rlzixnyurdhsgE1rdCPup5wzAOEZ1+v7fANI064YwdVozgAsPYlf0IHbANK0dSzi0ftPIPw7rn8+LTaIcU3E1BycWALR8GbveOG0cMq0ElZCpsFD8MC0/lh/ZNosNotM914uE9p8+WPXzsXOBdPNo82jYX/OK+fD/t0WbrMCVH82BKL+rN+x0nppnWmtXWubDHTWWjusHQ77v1XamhVMI7Ms6URjBFwVrpiG2+F2ngCkaTWqRq9HuA4Y/053se6NzomYL1zuL/eZ7m7sbrgEYkKLe8MpdWVtZU0VCKy5S0+KQCBrwHzRarKaOA0gReH+lfY1B0gQbFBiPxh+IYsKYlxhhlABE56lAOl28FkSDF0CwhWmalhDMUCu76ct3mU8WVjcCMTbCsmMykgJ/DEgcFYjTV9F+keBxymk+6idfgynr5d4kpCXU8CR+xix78LF1xs9ZpauGWLnSoHWUyUgcP4vawBHChRgC0DgwYysAZz1UIAtAIEnZrIGcAhHAbYABB5lyhrA6SgF2AIQTAMKLAEhIASEgBAQAkJASAkIASElIASEAktAFhQIpuzfdCUhAXkFBPwYsgZQ4kkBtgAEjDKyBlB7SwG2AAQcTNInhqIomgJsAQhYy1B1WBRg80DA84eqOslZ9fq8VM8jgYzV8sZ4WwEFHFmXpWBjiG6mmDMxH+CazcCUbUGpcrE8paQUY9aE2lXnbQeaNgUV/0i3g3TRqvhBCAhXHb8IwsWr7qolf4i6P6R1rGl3VnHZ/vOLOG5TgKlaxw8CjjQN+/So/VnHZeuabQGSGRX/x8TiPbtdenY7NKR/eaueh32Xiq0gV/boRdSGZ/watUsnMQX+LZethv05o3ed9NRduy4qZKUKdmc7gMDF2+24DQA20BIX7Zy+L6uM9zDO9dt+4glzZsbXX8LfiQI6Y0EvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA2LTA3VDAwOjIwOjQ2KzAyOjAwfVK8owAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNi0wN1QwMDoyMDo0NiswMjowMAwPBB8AAAAASUVORK5CYII=';
        return (
            <Image src={data} />
        );
    }

    renderProjectInfoPopover(project) {
        return (
            <Popover title="Project Info" id="popover-project-info">
                <dt>Deadline</dt>
                <dd>{moment(project.deadline).format('L')}</dd>
                <dt>Price per hour</dt>
                <dd>{project.billing} &euro;</dd>
                <dt>Budget in hours</dt>
                <dd>{project.budgetHours}{project.fixed ? ' (fixed)' : ''}</dd>
                <dt>Invoicer</dt>
                <dd>{project.invoicer ? project.invoicer.firstname+' '+project.invoicer.lastname : ''}</dd>
            </Popover>
        );
    }

    renderWriteNewStatusPopover(project) {
        return (
            <Popover title="Write new status" id="popover-new-status">
                <AddNewProjectStatusForm
                    onSuccess={() => {
                        this.props.addNotification('success', 'New project status created');
                        this.loadProject();
                    }}
                    onError={err => this.props.addNotification('danger', err.text || err.message || err)}
                    settings={{ formData: { projectStatuses: ['Green', 'Yellow', 'Red'] } }}
                    projectId={project.id}
                />
            </Popover>
        );
    }

}

function mapStateToProps(state) {
    return {
        formOptions: state.settings ? state.settings.formOptions : {}
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification
})(ProjectProfile), s);
