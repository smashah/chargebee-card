import { ChargebeeBaseComponent } from './chargebee-base-component.js';

export default class ChargebeeCardExpiry extends ChargebeeBaseComponent {
  constructor() {
    super();
    this.proptype = 'expiry';
    this.label = 'MM/YY';
  }
}
window.customElements.define('chargebee-card-expiry', ChargebeeCardExpiry);
