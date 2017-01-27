import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

@translate(['common', 'todo'])
export default class ShareList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Button
          className="todo-button"
          onClick={() => this.open()}
        >
          <Glyphicon glyph="share" /> {t('share_list')}</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{t('share_list')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            adasdsa
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>{t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}
