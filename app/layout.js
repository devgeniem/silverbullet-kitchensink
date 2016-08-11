import React, { PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import Navigation from './partials/navigation.js';
import Notification from './partials/notification.js';
//import SiteStyles from 'styles/site.scss';
//import withStyles from 'withStyles';
import session from './services/session';

const propTypes = {
  children: PropTypes.element.isRequired,
  route: PropTypes.object.isRequired,
};

function Layout({ route, children }) {
  if (__CLIENT__ && route && route.name) {
    document.title = route.name.charAt(0).toUpperCase() + route.name.substr(1);
  }

  var isLoggedIn = false;
  if (__CLIENT__)
    isLoggedIn = !!session.getToken();

  return (
    <div>
        {isLoggedIn ?
          <Grid fluid>
            <Navigation />
            <Row>
              <Col xs={12} lg={8} lgOffset={2}>
                <Notification />
                <Panel>
                  {children}
                </Panel>
              </Col>
            </Row>
          </Grid> :
          <Grid fluid>
              <Notification />
              {children}
          </Grid>
        }
    </div>
  );
}

//Layout.propTypes = propTypes;
//export default withStyles(Layout, SiteStyles);
