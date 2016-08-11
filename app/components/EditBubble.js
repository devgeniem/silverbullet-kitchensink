import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Popover, Form, FormGroup, FormControl, Glyphicon, Overlay, Col } from 'react-bootstrap';
import { formatThousands, getCurrencySymbol } from '../services/utils';

export default class EditBubble extends React.Component {

    static propTypes = {
        onSuccess: React.PropTypes.func,
        onError: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        toggleShow: React.PropTypes.func,
        type: React.PropTypes.string.isRequired,
        dropdownValues: React.PropTypes.array,
        currencyDropdownValues: React.PropTypes.array,
        label: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.any,
        currencyValue: React.PropTypes.any,
        show: React.PropTypes.bool,
        showPencil: React.PropTypes.bool
    };

    static defaultProps = {
        onSuccess: function() {},
        onError: function() {},
        onCancel: function() {},
        toggleShow: function() {},
        dropdownValues: [],
        currencyDropdownValues: [],
        label: '',
        placeholder: '',
        name: '',
        value: '',
        currencyValue: 'EUR',
        show: false,
        showPencil: false
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            currencyValue: props.currencyValue
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value && this.props.value !== newProps.value) {
            this.setState({
                value: newProps.value
            });
        }
        if (newProps.currencyValue && this.props.currencyValue !== newProps.currencyValue) {
            this.setState({
                currencyValue: newProps.currencyValue
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.toggleShow();
        if (this.props.type === "currency") {
            this.props.onSuccess({
                value: this.state.value.toString().replace(/\s+/g, ""),
                currencyValue: this.state.currencyValue
            });
        } else {
            this.props.onSuccess(this.state.value);
        }
    }

    handleFormValueChange(e) {
        if (e.target.name === "currency") {
            this.setState({
                currencyValue: e.target.value
            });
        } else {
            this.setState({
                value: e.target.value
            });
        }
    }

    render() {
        var { value, currencyValue } = this.state;
        var { label, name, placeholder, type, dropdownValues, currencyDropdownValues, show, showPencil } = this.props;
        return (
            <div style={{display:'inline-block', marginLeft:'0.5em'}}>
                <Glyphicon glyph="pencil" className={showPencil ? "" : "hidden"} style={{cursor:'pointer', fontSize:'14px'}} ref="target" onClick={()=>this.props.toggleShow()} />
                <Overlay rootClose onHide={()=>this.props.toggleShow()} target={() => ReactDOM.findDOMNode(this.refs.target)} placement="right" show={show}>
                    <Popover title={"Edit: "+label} id={"popover-edit-"+name}>
                        <Form onSubmit={e => this.handleSubmit(e)}>


                        {{
                            "dropdown": (
                                <FormGroup>
                                    <Col sm={12}>
                                        <FormControl componentClass="select" name={name} value={value} onChange={e => this.handleFormValueChange(e)}>
                                            {dropdownValues.map((val, i) => <option key={name+'-option-'+i} value={val}>{val}</option>)}
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                            ),
                            "user": (
                                <FormGroup>
                                    <Col sm={12}>
                                        <FormControl componentClass="select" name={name} value={value} onChange={e => this.handleFormValueChange(e)}>
                                            {dropdownValues.map((val, i) => <option key={name+'-option-'+i} value={val.id}>{val.firstname} {val.lastname}</option>)}
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                            ),
                            "currency": (
                                <FormGroup>
                                    <Col sm={6}>
                                        <FormControl type="text" name={name} value={formatThousands(value)} placeholder={placeholder} onChange={e => this.handleFormValueChange(e)} />
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="select" name="currency" value={currencyValue} onChange={e => this.handleFormValueChange(e)}>
                                            {currencyDropdownValues.map(val => <option key={'currency-option-'+val.value} value={val.value}>{val.symbol} ({val.value})</option>)}
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                            ),
                            "text": (
                                <FormGroup>
                                    <Col sm={12}>
                                        <FormControl type={type} name={name} value={value} placeholder={placeholder} onChange={e => this.handleFormValueChange(e)} />
                                    </Col>
                                </FormGroup>
                            )
                        }[type]}

                            <FormGroup>
                                <Col sm={12} style={{paddingTop:'0.5em',paddingBottom:'0.5em'}}>
                                    <Button type="submit" bsStyle="primary" className="pull-right">Save</Button>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Popover>
                </Overlay>
            </div>
        );
    }
}
