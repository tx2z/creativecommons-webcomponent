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
    /*
    it('should work with optional Title of work', () => {});
    it('should work without optional Title of work', () => {});
    it('should work with optional Attribute work to name', () => {});
    it('should work without optional Attribute work to name', () => {});
    it('should work with optional Attribute work to URL', () => {});
    it('should work without optional Attribute work to URL', () => {});
    it('should work with optional Source work URL', () => {});
    it('should work without optional Source work URL', () => {});
    it('should work with optional More permissions URL', () => {});
    it('should work without optional More permissions URL', () => {});
    it('should work with optional Format of work', () => {});
    it('should work without optional Format of work', () => {});
    */
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
