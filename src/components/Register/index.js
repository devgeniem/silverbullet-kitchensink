import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { translate } from 'react-i18next';
import RegisterForm from '../forms/RegisterForm';

const mapStateToProps = state => ({
  user: state.user,
});

@connect(mapStateToProps)
@translate(['login_register'])
export default class Register extends React.Component {

  static propTypes = {
    t: React.PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <div className="todo-registration-container">
        <Grid>
          <h1>{t('register_heading')}</h1>
          <div className="todo-registration-box">
            <RegisterForm />
          </div>
        </Grid>
      </div>
    );
  }
}
