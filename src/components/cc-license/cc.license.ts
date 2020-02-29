import { Licenses, License, Adaptations, IconSize } from './cc.license.interfaces';
import { prepareTemplate, attrToCamel } from '../../helpers';
import * as htmlTemplate from './cc.license.html';
import * as stylesheet from './cc.license.css';

/** The Creative Commons web component */
export default class CcLicense extends HTMLElement {
  constructor() {
    super();
  }

  private componentAttributes: string[] = ['license', 'adaptations', 'commercial', 'icon'];

  private getLicense(license: string, iconSize: string | null): License {
    let title: string;
    let imageHeight: number;
    let imageWidth: number;
    switch (license as Licenses) {
      case 'by': {
        title = 'Attribution';
        break;
      }
      case 'by-nc': {
        title = 'Attribution-NonCommercial';
        break;
      }
      case 'by-nc-nd': {
        title = 'Attribution-NonCommercial-NoDerivatives';
        break;
      }
      case 'by-nc-sa': {
        title = 'Attribution-NonCommercial-ShareAlike';
        break;
      }
      case 'by-nd': {
        title = 'Attribution-NoDerivatives';
        break;
      }
      case 'by-sa': {
        title = 'Attribution-ShareAlike';
        break;
      }
      default: {
        license = 'by';
        title = 'Attribution';
      }
    }
    switch (iconSize as IconSize) {
      case '80x15':
      case '88x31': {
        const imageSizes = (iconSize as IconSize).split('x');
        imageHeight = parseInt(imageSizes[1]);
        imageWidth = parseInt(imageSizes[0]);
        break;
      }
      default: {
        iconSize = '88x31';
        imageHeight = 31;
        imageWidth = 88;
      }
    }
    return {
      url: `http://creativecommons.org/licenses/${license}/4.0/`,
      image: `https://i.creativecommons.org/l/${license}/4.0/${iconSize}.png`,
      imageHeight,
      imageWidth,
      title: `Creative Commons ${title} 4.0 International License`,
    };
  }

  private chooseLicense(
    adaptations: string | null,
    commercial: boolean,
    icon: string | null
  ): License {
    switch (adaptations as Adaptations) {
      case 'yes': {
        if (commercial) {
          return this.getLicense('by', icon);
        } else {
          return this.getLicense('by-nc', icon);
        }
      }
      case 'no': {
        if (commercial) {
          return this.getLicense('by-nd', icon);
        } else {
          return this.getLicense('by-nc-nd', icon);
        }
      }
      case 'share-alike': {
        if (commercial) {
          return this.getLicense('by-sa', icon);
        } else {
          return this.getLicense('by-nc-sa', icon);
        }
      }
    }
    return this.getLicense('by', icon);
  }

  /**
   * Executed when the custom element is added to the page.
   */
  public connectedCallback(): void {
    // Add the main template to the component
    const templateElement = document.createElement('template');

    // Add stylesheet
    templateElement.innerHTML = `<style>${stylesheet.default}</style>`;

    // Recover all the attributes so we can add them to the template
    // All attributes are converted to cameCase.
    // ex: data-attribute => dataAttribute
    const attributes: Record<string, string | null> = {};
    this.componentAttributes.forEach(attribute => {
      const key = attrToCamel(attribute);
      attributes[key] = this.getAttribute(attribute);
    });
    const icon = attributes.icon;
    let license: License;
    if (attributes.license) {
      // If the attribute license is defined use it
      license = this.getLicense(attributes.license, icon);
    } else {
      // If no attribute license try to build the license from other attributes
      const adaptations: string | null = attributes.adaptations;
      const commercial: boolean = attributes.commercial
        ? // if commercial attribute exists transform to boolean
          attributes.commercial === 'true'
        : // if not return true
          true;
      license = this.chooseLicense(adaptations, commercial, icon);
    }
    // Prepare template
    templateElement.innerHTML += prepareTemplate(htmlTemplate.default, license, '');

    // Attach template content to the dom inside the element
    this.appendChild(templateElement.content.cloneNode(true));
  }
  /**
   * Executed when the custom element is removed from page.
   */
  public disconnectedCallback(): void {
    console.log('disconected!');
  }
}
