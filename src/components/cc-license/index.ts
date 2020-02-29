import CcLicense from './cc.license';
window.customElements.define('cc-license', CcLicense);
declare global {
  interface HTMLElementTagNameMap {
    'cc-license': CcLicense;
  }
}
