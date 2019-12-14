import { LitElement, html, css } from 'lit-element';
import './chargebee-card-number.js';
import './chargebee-card-cvv.js';
import './chargebee-card-expiry.js';
import './chargebee-card-form-layout.js';
import './v-styles.js';

export default class ChargebeeCard extends LitElement {
  static get properties() {
    return {
      id: { type: String },
      publishableKey: { type: String },
      site: { type: String },
      token: { type: Object },
      chargebeeConfig: { type: Object },
      fonts: { type: Object },
      classes: { type: Object },
      state: { type: Object, notify: true },
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

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
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

  render() {
    return html`
      <chargebee-card-form-layout
        site=${this.site}
        pk=${this.publishableKey}
        .responsiveSteps=${[{ minWidth: '0', columns: 2 }]}
        .options=${{
          icon: true,
          classes: {
            focus: 'focus',
            invalid: 'invalid',
            empty: 'empty',
            complete: 'complete',
          },
          style: {
            base: {
              fontFamily: 'Karla',
              fontWeight: 'bold',
            },
          },
          fonts: ['https://fonts.googleapis.com/css?family=Karla&display=swap'],
        }}
        @state-changed=${this.cStateChanged}
        @ready=${this.r}
        @change=${this.c}
      >
        <chargebee-card-number colspan="2"> </chargebee-card-number>
        <chargebee-card-expiry colspan="1"> </chargebee-card-expiry>
        <chargebee-card-cvv colspan="1"> </chargebee-card-cvv>
        <slot></slot>
      </chargebee-card-form-layout>
    `;
  }

  r() {
    this.dispatchEvent(new CustomEvent('ready'));
  }

  c(_) {
    this.dispatchEvent(new CustomEvent('change', _));
  }

  async click() {
    this.token = await this.tokenize({});
  }

  cStateChanged(_) {
    this.state = _.detail.value;
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

  // change(_){
  //   console.log(_)
  //   this.getCardElement(_.field).set('invalid',_.error)

  //   if(_.error){
  //     //show error message
  //     this.getCardElement(_.field).set('errorMessage',_.error.message)
  //     console.log('error',this.getCardElement(_.field), _.error.message)
  //   }
  // }

  // updated(changedProperties) {
  //   let updateCbComponent = false;
  //   changedProperties.forEach((oldValue, propName) => {
  //     console.log(`${propName} changed. oldValue: ${oldValue}`);
  //     switch (propName) {
  //       case 'fonts':
  //       case 'classes':
  //       case 'locale':
  //       case 'placeholder':
  //       case 'cbstyle':
  //       case 'icon':
  //         updateCbComponent = true;
  //         break;
  //       case 'state':
  //         this.shadowRoot.children.forEach(element => {
  //           element.set("state", this.state);
  //         });
  //           // return;
  //         if(this.state.cbComponent && this.state.moduleLoaded && this.state.cbComponent.status == 0) {
  //           this.state.cbComponent.mount();
  //         }
  //       break;
  //     }
  //   });
  // //   // let b = this.shadowRoot.getElementById('b');
  // //   // b.focus();

  // //   const cbComponent = this.state.cbComponent;

  // //   if (cbComponent && this.state.moduleLoaded && cbComponent.status == 0) {
  // //     cbComponent.mount(this.gbid(this.id));
  // //     this.gbid('billing-cc-no').disabled = false;
  // //     this.gbid('billing-cc-exp').disabled = false;
  // //     this.gbid('billing-cc-cvv').disabled = false;
  // //   }

  //   if (updateCbComponent) cbComponent.update(this.getPropOptions)
  // }

  // onReady() {

  //           // now enable all fields
  //         this.shadowRoot.children.forEach(element => {
  //           element.set("disabled", false);
  //         });
  // }

  // getCardElement(proptype){
  //  return this.shadowRoot.children.find(x=>x.proptype===proptype)
  // }
}

customElements.define('chargebee-card', ChargebeeCard);
export { ChargebeeCard };
