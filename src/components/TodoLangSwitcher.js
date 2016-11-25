import React from 'react';
import i18next from 'i18next';
import { translate } from 'react-i18next';
import {Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import localStorage from 'localStorage';

class TodoLangSwitcher extends React.Component {

  constructor(props) {
    super(props);
  }

  onSelectLanguage(lang) {
    localStorage.setItem("currentLang", lang)
    i18next.changeLanguage(lang)
  }

  getLanguages() {
    const { t } = this.props

    return (
      [
        {code: 'fi', name: t('finnish')},
        {code: 'en', name: t('english')}
      ]
    )
  }
  render() {
    const items = this.getLanguages();
    const { t } = this.props

    return (
      <Dropdown id="todo-header-bar-menu"
                pullRight>

        <Dropdown.Toggle className="todo-header-bar-menu-button" bsRole="toggle" noCaret>
          {t('language')}
        </Dropdown.Toggle>
        <Dropdown.Menu bsRole="menu">
          {items.map(item => {
            let glyphicon = item.glyphicon ? <Glyphicon glyph={item.glyphicon}/> : null;
            return (
              <MenuItem key={item.code} onClick={() => this.onSelectLanguage(item.code)}>
                {glyphicon} {item.name}
              </MenuItem>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default translate(['common'])(TodoLangSwitcher);
