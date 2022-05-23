import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import styles from './index.scss';

@customElement('ilb-button')
export class IlbButton extends LitElement {

  static get styles(): any {
    return [styles];
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <button class="btn">
        <slot></slot>
      </button>
    `;
  }
}