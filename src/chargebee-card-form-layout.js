import { FormLayoutElement } from '@vaadin/vaadin-form-layout/src/vaadin-form-layout.js';

export default class ChargebeeCardFormLayout extends FormLayoutElement {
  static get properties() {
    return {
      ...this,
      id: { type: String },
      site: { type: String, notify: true },
      pk: { type: String, notify: true },
      chargebeeConfig: { type: Object },
      fonts: { type: Object },
      classes: { type: Object },
      state: {
        type: Object,
        observer: '_cStateChanged',
        notify: true,
      },
      options: {
        type: Object,
        notify: true,
      },
      locale: { type: Object },
      placeholder: { type: Object },
      cbstyle: { type: Object },
      icon: { type: Object },
      currency: { type: Object },
      onBlur: { type: Object },
      onChange: { type: Object },
      onFocus: { type: Object },
      onReady: { type: Object },
    };
  }

  get getPropOptions() {
    return {
      fonts: this.fonts,
      classes: this.classes,
      locale: this.locale,
      cbstyle: this.cbstyle,
      placeholder: this.placeholder,
      icon: this.icon,
      currency: this.currency,
    };
  }

  constructor() {
    super();
    this.proptype = 'card';
    this.state = {
      moduleLoaded: false,
      cbComponent: null,
      cbInstance: null,
    };
    // this.id = `${this.proptype}-field-${genUUID()}`;
  }

  connectedCallback() {
    super.connectedCallback();
    let cbInstance;
    try {
      // eslint-disable-next-line
      cbInstance = Chargebee.getInstance();
    } catch (error) {
      // eslint-disable-next-line
      Chargebee.init({
        site: this.site,
        publishableKey: this.pk,
      });
      // eslint-disable-next-line
      cbInstance = Chargebee.getInstance();
    }
    // const options = this.getPropOptions;
    let cbComponent = {};
    cbInstance.load('components').then(() => {
      cbComponent = cbInstance.createComponent('card', this.options);

      // Attach listeners if specified (only applicable for combined field)
      cbComponent.on('ready', _ => this.onReady(_));
      cbComponent.on('blur', _ => this.onBlur(_));
      cbComponent.on('focus', _ => this.focus(_));
      cbComponent.on('change', _ => this.onChange(_));

      this.state = {
        cbComponent,
        cbInstance,
        moduleLoaded: true,
      };
    });
  }

  tokenize(additionalData) {
    const { cbComponent } = this.state;
    return cbComponent.tokenize(additionalData);
  }

  authorizeWith3ds(paymentIntent, additionalData, callbacks) {
    const { cbComponent } = this.state;
    return cbComponent.authorizeWith3ds(paymentIntent, additionalData, callbacks);
  }

  focus() {
    const { cbComponent } = this.state;
    cbComponent.focus();
  }

  blur() {
    const { cbComponent } = this.state;
    if (cbComponent) cbComponent.blur();
  }

  clear() {
    const { cbComponent } = this.state;
    cbComponent.clear();
  }

  // attributeChangedCallback(changedProperties) {
  //     let updateCbComponent = false;
  //     changedProperties.forEach((oldValue, propName) => {
  //         console.log(`${propName} changed. oldValue: ${oldValue}`);
  //         switch (propName) {
  //             case 'fonts':
  //             case 'classes':
  //             case 'locale':
  //             case 'placeholder':
  //             case 'cbstyle':
  //             case 'icon':
  //                 updateCbComponent = true;
  //                 break;
  //         }
  //     });

  //     if (updateCbComponent) cbComponent.update(this.getPropOptions)
  // }

  onReady() {
    this.dispatchEvent(new CustomEvent('ready'));
    this.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter(x => x.proptype)
      .forEach(element => {
        element.set('disabled', false);
      });
  }

  onChange(_) {
    this.dispatchEvent(new CustomEvent('change', { detail: _ }));
  }

  getCardElement(proptype) {
    return this.shadowRoot.children.find(x => x.proptype === proptype);
  }

  _cStateChanged() {
    this.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter(x => x.proptype)
      .forEach(element => {
        element.set('state', this.state);
      });
    if (this.state.cbComponent && this.state.moduleLoaded && this.state.cbComponent.status === 0) {
      this.state.cbComponent.mount();
    }
  }
}
customElements.define('chargebee-card-form-layout', ChargebeeCardFormLayout);
