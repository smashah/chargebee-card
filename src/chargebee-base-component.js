import { TextFieldElement } from '@vaadin/vaadin-text-field/src/vaadin-text-field.js';
import { genUUID } from './utils.js';

export class ChargebeeBaseComponent extends TextFieldElement {
  // onReady: any;
  // onBlur: any;

  /**
   * Create an observed property. Triggers update on change.
   */

  // @property() fonts;
  // @property() classes;
  // @property() locale;
  // @property() placeholder;
  // @property() cbstyle;
  // @property() icon;
  // @property() currency;
  // @property() onBlur;
  // @property() onChange;
  // @property() onFocus;
  // @property() onReady;
  // @property()
  // fonts, classes, icon, styles: style, locale, placeholder, currency

  static get properties() {
    return {
      ...this,
      id: { type: String },
      proptype: { type: String },
      fonts: { type: Object },
      field: { type: Object, notify: true },
      state: { type: Object, observer: '_cStateChanged', notify: true },
      componentState: { type: Object },
      cbstyle: { type: Object },
      icon: { type: Object },
      currency: { type: Object },
      onBlur: { type: Object },
      onChange: { type: Object },
      onFocus: { type: Object },
      onReady: { type: Object },
    };
  }

  constructor() {
    super();
    this.required = true;
    this.tabindex = '-1';
    this.disabled = true;
    this.clearButtonVisible = false;
    this.componentState = {};
  }

  ready() {
    this.id = `${this.proptype}-field-${genUUID()}`;
    super.ready();
  }

  cChange(_) {
    this.set('componentState', _);
    this.set('invalid', _.error);
    if (_.error) {
      this.set('errorMessage', _.error.message);
    }
  }

  attributeChangedCallback(changedProperties) {
    super.attributeChangedCallback(changedProperties);
  }

  _cStateChanged() {
    if (!this.state || !this.state.cbComponent) return;
    const { cbComponent } = this.state;
    if (!cbComponent.fields.find(x => x.fieldType === this.proptype)) {
      this.field = cbComponent
        .createField(this.proptype)
        .at(this.root.querySelector('[part="input-field"]'));
      this.field.on('change', _ => this.cChange(_));
      this.style.fontFamily = cbComponent.options.style.base.fontFamily || '';
      this.checkValidity = () => !this.componentState.error;
      // Attaching listeners if any
      //   if(listeners) {
      //     if(listeners.onBlur) this.field.on('blur', listeners.onBlur);
      //     if(listeners.onFocus) this.field.on('focus', listeners.onFocus);
      //     if(listeners.onReady) this.field.on('ready', listeners.onReady);
      //     if(listeners.onChange) this.field.on('change', listeners.onChange);
      // }
    }
  }
}
window.customElements.define('chargebee-base-component', ChargebeeBaseComponent);
