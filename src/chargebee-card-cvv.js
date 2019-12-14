import { ChargebeeBaseComponent } from './chargebee-base-component.js';

export default class ChargebeeCardCvv extends ChargebeeBaseComponent {
  constructor() {
    super();
    this.proptype = 'cvv';
    this.label = 'CVV';
  }
}
window.customElements.define('chargebee-card-cvv', ChargebeeCardCvv);
