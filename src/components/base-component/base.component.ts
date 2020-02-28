// import * as interfaces from './base.component.interfaces';
import { prepareTemplate } from '../../helpers';
import * as htmlTemplate from './base.component.html';
import * as stylesheet from './base.component.css';

/** The BaseComponent web component */
export default class BaseComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Add the main template to the component
    const templateElement = document.createElement('template');

    // Add stylesheet
    templateElement.innerHTML = `<style>${stylesheet.default}</style>`;

    // Prepare template
    const templateVariables = {
      hello: 'Hello There!',
    };
    templateElement.innerHTML += prepareTemplate(htmlTemplate.default, templateVariables);

    // Attach template content to the shadow dom
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(templateElement.content.cloneNode(true));
  }

  /**
   * Define witch attribunes of the custom element need to be observed
   */
  static get observedAttributes(): string[] {
    return ['data-attribute'];
  }

  /**
   * Execute every time an attribute defined in observedAttributes changes
   * @param attr The attribute that changes
   * @param oldValue Old value of the attribute
   * @param newValue New value of the attribute
   */
  public attributeChangedCallback(attr: string, oldValue: string, newValue: string): void {
    if (attr === 'data-attribute' && oldValue !== newValue) {
      const testAttribute = this.shadow.getElementById('attributeValue') as HTMLElement;
      testAttribute.innerHTML = newValue;
    }
  }

  /**
   * Executed when the custom element is added to the page.
   */
  public connectedCallback(): void {
    this.addEventListeners();
  }
  /**
   * Executed when the custom element is removed from page.
   */
  public disconnectedCallback(): void {
    console.log('disconected!');
    this.shadow.removeEventListener(
      'click',
      event => {
        this.eventListerners(this.shadow, event);
      },
      false
    );
  }

  /**
   * Add EventListeners to the shadow dom of the component.
   * It allow to listen events even if the content of the component is not yet
   * created
   */
  private addEventListeners(): void {
    this.shadow.addEventListener(
      'click',
      event => {
        this.eventListerners(this.shadow, event);
      },
      false
    );
  }

  /**
   * Function executed by an eventlistener to perform onclick action
   * @param shadow The shadow DOM element attached to the class
   * @param event The Event of the parent event listener
   */
  private eventListerners(shadow: ShadowRoot, event: Event): void {
    const target = event.target as HTMLElement;

    /**
     * Add the event listener to the testButton to add a message in the
     * testMessage component's element
     */
    if (target.id === 'testButton') {
      event.preventDefault();
      const testMessage = shadow.getElementById('testMessage') as HTMLElement;
      testMessage.innerHTML = 'You click the button!';
    }
  }
}
