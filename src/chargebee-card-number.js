import { ChargebeeBaseComponent } from './chargebee-base-component.js';

export class ChargebeeCardNumber extends ChargebeeBaseComponent {
  constructor() {
    super();
    this.label = 'Card number';
    this.proptype = 'number';
  }
}
window.customElements.define('chargebee-card-number', ChargebeeCardNumber);
