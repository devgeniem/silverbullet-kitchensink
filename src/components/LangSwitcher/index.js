import React from 'react';
import i18next from 'i18next';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import { LangActions } from '../../actions';

function mapStateToProps(state) {
  return {
    lang: state.lang.lang,
  };
}

@connect(mapStateToProps)
@translate(['common'])
export default class LangSwitcher extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    t: React.PropTypes.func.isRequired,
  };

  onSelectLanguage(lang) {
    const { dispatch } = this.props;
    LangActions(dispatch).changeLanguage(lang);
    i18next.changeLanguage(lang);
  }

  getLanguages() {
    const { t } = this.props;

    return (
    [
        { code: 'fi', name: t('finnish') },
        { code: 'en', name: t('english') },
    ]
    );
  }
  render() {
    const items = this.getLanguages();
    const { t } = this.props;

    return (
      <Dropdown
        id="todo-header-bar-menu"
        pullRight
      >

        <Dropdown.Toggle className="todo-header-bar-menu-button" bsRole="toggle" noCaret>
          {t('language')}
        </Dropdown.Toggle>
        <Dropdown.Menu bsRole="menu">
          {items.map((item) => {
            const glyphicon = item.glyphicon ? <Glyphicon glyph={item.glyphicon} /> : null;
            return (
              <MenuItem key={item.code} onClick={() => this.onSelectLanguage(item.code)}>
                {glyphicon} {item.name}
              </MenuItem>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
