import 'jasmine';
import CcLicense from './cc.license';
import { Licenses } from './cc.license.interfaces';

const getTitle = (title: string): string => {
  return `Creative Commons ${title} 4.0 International License`;
};

const checkLicense = (
  element: HTMLElement,
  license: Licenses,
  title: string,
  addAttr = true
): void => {
  if (addAttr) {
    element.setAttribute('license', license);
  }
  document.body.append(element);
  const image = element.querySelector('img') as HTMLImageElement;
  expect(image.getAttribute('src')).toContain(`https://i.creativecommons.org/l/${license}/4.0/`);
  const imageUrl = element.querySelector('a.image') as HTMLAnchorElement;
  expect(imageUrl.getAttribute('href')).toEqual(
    `http://creativecommons.org/licenses/${license}/4.0/`
  );
  const url = element.querySelector('a.title') as HTMLAnchorElement;
  expect(url.getAttribute('href')).toEqual(`http://creativecommons.org/licenses/${license}/4.0/`);
  expect(url.innerHTML).toEqual(getTitle(title));
};

const checkChooseLicense = (
  element: HTMLElement,
  adaptations: string,
  commercial: boolean,
  license: Licenses,
  title: string
): void => {
  element.setAttribute('adaptations', adaptations);
  element.setAttribute('commercial', commercial.toString());
  document.body.append(element);
  const image = element.querySelector('img') as HTMLImageElement;
  expect(image.getAttribute('src')).toContain(`https://i.creativecommons.org/l/${license}/4.0/`);
  const imageUrl = element.querySelector('a.image') as HTMLAnchorElement;
  expect(imageUrl.getAttribute('href')).toEqual(
    `http://creativecommons.org/licenses/${license}/4.0/`
  );
  const url = element.querySelector('a.title') as HTMLAnchorElement;
  expect(url.getAttribute('href')).toEqual(`http://creativecommons.org/licenses/${license}/4.0/`);
  expect(url.innerHTML).toEqual(getTitle(title));
};

const checkIcon = (element: HTMLElement, iconSize: string, addAttr = true): void => {
  if (addAttr) {
    element.setAttribute('icon', iconSize);
  }
  document.body.append(element);
  const imageSizes = iconSize.split('x');
  const image = element.querySelector('img') as HTMLImageElement;
  expect(image.getAttribute('width')).toEqual(imageSizes[0]);
  expect(image.getAttribute('height')).toEqual(imageSizes[1]);
  expect(image.getAttribute('src')).toContain(`${iconSize}.png`);
};

const checkTitleFormat = (element: HTMLElement, format: string, metaDataFormat: string): void => {
  const title = 'The work';
  const text = `<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title" href="${metaDataFormat}" rel="dct:type">${title}</span>`;
  element.setAttribute('work-title', title);
  element.setAttribute('format', format);
  document.body.append(element);
  expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
};

const checkFormat = (element: HTMLElement, format: string, metaDataFormat: string): void => {
  const text = `This <span href="${metaDataFormat}" rel="dct:type">work</span>`;
  element.setAttribute('format', format);
  document.body.append(element);
  expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
};

window.customElements.define('cc-license', CcLicense);
describe('Creative Commons web component Spec:', () => {
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement('cc-license');
  });

  describe('the Creative Commons web component', () => {
    it('should have type Attribution when no attributes', () => {
      checkLicense(element, 'by', 'Attribution', false);
    });
    it('should have type Attribution when license is by', () => {
      checkLicense(element, 'by', 'Attribution');
    });
    it('should have type Attribution-NoDerivatives when license is by-nd', () => {
      checkLicense(element, 'by-nd', 'Attribution-NoDerivatives');
    });
    it('should have type Attribution-ShareAlike when license is by-sa', () => {
      checkLicense(element, 'by-sa', 'Attribution-ShareAlike');
    });
    it('should have type Attribution-NonCommercial when license is by-nc', () => {
      checkLicense(element, 'by-nc', 'Attribution-NonCommercial');
    });
    it('should have type Attribution-NonCommercial-NoDerivatives when license is by-nc-nd', () => {
      checkLicense(element, 'by-nc-nd', 'Attribution-NonCommercial-NoDerivatives');
    });
    it('should have type Attribution-NonCommercial-ShareAlike when license is by-nc-sa', () => {
      checkLicense(element, 'by-nc-sa', 'Attribution-NonCommercial-ShareAlike');
    });

    it('should have type Attribution when adaptations="yes" & commercial="true"', () => {
      checkChooseLicense(element, 'yes', true, 'by', 'Attribution');
    });
    it('should have type Attribution-NoDerivatives when adaptations="no" & commercial="true"', () => {
      checkChooseLicense(element, 'no', true, 'by-nd', 'Attribution-NoDerivatives');
    });
    it('should have type Attribution-ShareAlike when adaptations="share-alike" & commercial="true"', () => {
      checkChooseLicense(element, 'share-alike', true, 'by-sa', 'Attribution-ShareAlike');
    });
    it('should have type Attribution-NonCommercial when adaptations="yes" & commercial="false"', () => {
      checkChooseLicense(element, 'yes', false, 'by-nc', 'Attribution-NonCommercial');
    });
    it('should have type Attribution-NonCommercial-NoDerivatives when adaptations="no" & commercial="false"', () => {
      checkChooseLicense(
        element,
        'no',
        false,
        'by-nc-nd',
        'Attribution-NonCommercial-NoDerivatives'
      );
    });
    it('should have type Attribution-NonCommercial-ShareAlike when adaptations="share-alike" & commercial="false"', () => {
      checkChooseLicense(
        element,
        'share-alike',
        false,
        'by-nc-sa',
        'Attribution-NonCommercial-ShareAlike'
      );
    });
    it('should have Normal Icon with no icon attribute', () => {
      checkIcon(element, '88x31', false);
    });
    it('should have Normal Icon', () => {
      checkIcon(element, '88x31');
    });
    it('should have Compact Icon', () => {
      checkIcon(element, '80x15');
    });
    it('should work with optional More permissions URL', () => {
      const url = 'http://jesus.perezpaz.es/morepermissions';
      const text = `Permissions beyond the scope of this license may be available at
      <a xmlns:cc="http://creativecommons.org/ns#" href="${url}" rel="cc:morePermissions">${url}</a>.`;
      element.setAttribute('permissions', url);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
    it('should work with optional Source work URL', () => {
      const url = 'http://jesus.perezpaz.es/source';
      const text = `Based on a work at 
      <a xmlns:dct="http://purl.org/dc/terms/"href="${url}"rel="dct:source">${url}</a>.`;
      element.setAttribute('source', url);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
    it('should work with optional Title of work', () => {
      const title = 'The work';
      const text = `<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">${title}</span>`;
      element.setAttribute('work-title', title);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
    it('should work with optional Title of work && format "Audio"', () => {
      const format = 'Audio';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Sound';
      checkTitleFormat(element, format, metaDataFormat);
    });
    it('should work with optional Title of work && format "Video"', () => {
      const format = 'Video';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/MovingImage';
      checkTitleFormat(element, format, metaDataFormat);
    });
    it('should work with optional Title of work && format "Text"', () => {
      const format = 'Text';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Text';
      checkTitleFormat(element, format, metaDataFormat);
    });
    it('should work with optional Title of work && format "Dataset"', () => {
      const format = 'Dataset';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Dataset';
      checkTitleFormat(element, format, metaDataFormat);
    });
    it('should work with optional Title of work && format "Interactive"', () => {
      const format = 'Interactive';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/InteractiveResource';
      checkTitleFormat(element, format, metaDataFormat);
    });
    it('should work with format "Audio" without Title of Work', () => {
      const format = 'Audio';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Sound';
      checkFormat(element, format, metaDataFormat);
    });
    it('should work with format "Video" without Title of Work', () => {
      const format = 'Video';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/MovingImage';
      checkFormat(element, format, metaDataFormat);
    });
    it('should work with format "Text" without Title of Work', () => {
      const format = 'Text';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Text';
      checkFormat(element, format, metaDataFormat);
    });
    it('should work with format "Dataset" without Title of Work', () => {
      const format = 'Dataset';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/Dataset';
      checkFormat(element, format, metaDataFormat);
    });
    it('should work with format "Interactive" without Title of Work', () => {
      const format = 'Interactive';
      const metaDataFormat = 'http://purl.org/dc/dcmitype/InteractiveResource';
      checkFormat(element, format, metaDataFormat);
    });
    it('should work with optional Attribute work to name', () => {
      const attribution = 'Jesus Pérez';
      const text = `by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">${attribution}</span>`;
      element.setAttribute('attribution-title', attribution);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
    it('should work with optional Attribute work to URL', () => {
      const attributionUrl = 'http://jesus.perezpaz.es';
      const text = `by <a 
        xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName"
        href="${attributionUrl}" 
        rel="cc:attributionURL"
      >${attributionUrl}</a>`;
      element.setAttribute('attribution-url', attributionUrl);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
    it('should work with optional Attributes work to name && work to URL', () => {
      const attribution = 'Jesus Pérez';
      const attributionUrl = 'http://jesus.perezpaz.es';
      const text = `by <a 
        xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName"
        href="${attributionUrl}" 
        rel="cc:attributionURL"
      >${attribution}</a>`;
      element.setAttribute('attribution-title', attribution);
      element.setAttribute('attribution-url', attributionUrl);
      document.body.append(element);
      expect(element.innerHTML.replace(/ |\n|\r/g, '')).toContain(text.replace(/ |\n|\r/g, ''));
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
