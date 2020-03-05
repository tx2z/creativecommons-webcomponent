import {
  Licenses,
  License,
  LicenseMetadata,
  Adaptations,
  IconSize,
  TemplateVariables,
} from './cc.license.interfaces';
import { prepareTemplate, attrToCamel } from '../../helpers';
import * as htmlTemplate from './cc.license.html';
import * as stylesheet from './cc.license.css';

/**
 * The Creative Commons web component
 * @attr {'by' | 'by-nc' | 'by-nc-nd' | 'by-nc-sa' | 'by-nd' | 'by-sa'} license - Choose the license (overwrites adaptations & commercial)
 * @attr {'yes' | 'no' | 'share-alike'} adaptations - Allow adaptations of your work to be shared?
 * @attr {Boolean} commercial - Allow commercial uses of your work?
 * @attr {'88x31' | '80x15'} icon - The icon size
 * @attr {String} work-title - The title of the work you are licensing.
 * @attr {String} source - The URL of the work upon which this work is based or derived.
 * @attr {String} attribution-title - The name of the person who should receive attribution for the work. Most often, this is the author.
 * @attr {String} attribution-url - The URL to which the work should be attributed.
 * @attr {String} permissions - A URL where a user can find information about obtaining rights that are not already permitted by the CC license.
 * @attr {'audio' | 'video' | 'image' | 'text' | 'dataset' | 'interactive'} format - Describes what kind of work is being licensed.
 **/
export default class CcLicense extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Allowed attributes that can be passed to the component.
   */
  private componentAttributes: string[] = [
    'license',
    'adaptations',
    'commercial',
    'icon',
    'work-title',
    'source',
    'attribution-title',
    'attribution-url',
    'permissions',
    'format',
  ];

  /**
   * Available fields in license metadata.
   */
  private licenseMetadata: string[] = [
    'workTitle',
    'source',
    'attributionTitle',
    'attributionUrl',
    'permissions',
    'format',
  ];

  /**
   * Available format to describes what kind of work is being licensed.
   */
  private formats = {
    audio: 'http://purl.org/dc/dcmitype/Sound',
    video: 'http://purl.org/dc/dcmitype/MovingImage',
    image: 'http://purl.org/dc/dcmitype/StillImage',
    text: 'http://purl.org/dc/dcmitype/Text',
    dataset: 'http://purl.org/dc/dcmitype/Dataset',
    interactive: 'http://purl.org/dc/dcmitype/InteractiveResource',
  };

  /**
   * Get the correct license based on the license shortname.
   * @param license - options: "by" (default if sting is not one of the availables)
   *               | "by-nc" | "by-nc-nd" | "by-nc-sa" | "by-nd" | "by-sa"
   * @param iconSize - The size of the icon. options: 88x31(default if null) | 80x15
   */
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

  /**
   * Choose the correct license based on the attributes pased to the element.
   * @param adaptations - options: 'yes' | 'no' | 'share-alike'
   * @param commercial
   * @param icon
   */
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
   * Recover the license metadata from the attributes passed to the element
   * @param attributes
   */
  private getMetadata(attributes: Record<string, string | null>): LicenseMetadata {
    const metadata: LicenseMetadata = {};

    this.licenseMetadata.forEach(dataAttribute => {
      if (attributes[dataAttribute]) {
        if (dataAttribute === 'format') {
          const attrLowerCase = (attributes[dataAttribute] as string).toLowerCase();
          metadata.format = this.formats[attrLowerCase];
        } else {
          metadata[dataAttribute] = attributes[dataAttribute];
        }
      }
    });
    return metadata;
  }

  /**
   * Generate the license data based on the attributes of the element
   * @param attributes
   */
  private generateLicense(attributes: Record<string, string | null>): License {
    let license: License;

    const icon = attributes.icon;

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
    // Get license metadata
    const metadata = this.getMetadata(attributes);
    if (Object.entries(metadata).length !== 0) {
      license.metadata = metadata;
    }
    return license;
  }

  /**
   * Generate the temaplte variables based on the license data
   * @param license
   */
  private generateTemplateVariables(license: License): TemplateVariables {
    const variables = {
      url: license.url,
      imageWidth: license.imageWidth,
      imageHeight: license.imageHeight,
      image: license.image,
      title: license.title,
      work: 'This work',
      attribution: '',
      source: '',
      permissions: '',
    };
    // Put the correct title and format if defined
    if (license.metadata?.workTitle || license.metadata?.format) {
      let typeMetaData = '';
      if (license.metadata?.format) {
        typeMetaData = `href="${license.metadata.format}" rel="dct:type"`;
      }
      if (license.metadata?.workTitle) {
        variables.work = `<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title" ${typeMetaData}>${license.metadata.workTitle}</span>`;
      } else {
        variables.work = `This <span ${typeMetaData}>work</span>`;
      }
    }
    // Put the correct attribution data if defined
    if (license.metadata?.attributionTitle || license.metadata?.attributionUrl) {
      const attributionMetaData =
        'xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName"';
      if (license.metadata?.attributionUrl) {
        variables.attribution = `
        by
        <a 
          ${attributionMetaData}
          href="${license.metadata.attributionUrl}" 
          rel="cc:attributionURL"
        >${license.metadata.attributionTitle || license.metadata.attributionUrl}</a>`;
      } else {
        variables.attribution = `
        by
        <span ${attributionMetaData}>${license.metadata.attributionTitle}</span>`;
      }
    }
    // Put the correct source work if defined
    if (license.metadata?.source) {
      variables.source = `
      <br />
      Based on a work at 
      <a 
        xmlns:dct="http://purl.org/dc/terms/"
        href="${license.metadata.source}"
        rel="dct:source"
      >${license.metadata.source}</a>.`;
    }
    // Put the correct permissions url if defined
    if (license.metadata?.permissions) {
      variables.permissions = `
      <br />
      Permissions beyond the scope of this license may be available at
      <a 
        xmlns:cc="http://creativecommons.org/ns#"
        href="${license.metadata.permissions}"
        rel="cc:morePermissions"
      >${license.metadata.permissions}</a>.`;
    }

    return variables;
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

    // Generate the license date
    const license = this.generateLicense(attributes);

    // Generate the template variables based on the license data
    const templateVariables = this.generateTemplateVariables(license);

    // Prepare template
    templateElement.innerHTML += prepareTemplate(htmlTemplate.default, templateVariables, '');

    // Attach template content to the dom inside the element
    this.appendChild(templateElement.content.cloneNode(true));
  }
}
