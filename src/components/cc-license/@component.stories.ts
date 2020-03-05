// import { Licenses } from './cc.license.interfaces';
import { text, boolean, radios, select, withKnobs } from '@storybook/addon-knobs';
import './index';

import notes from './@component.notes.md';

export default {
  decorators: [withKnobs],
  parameters: {
    notes: { notes },
  },
  title: 'Creative Commons Web Component',
};

export const CcLicense = (): HTMLElement => {
  const component = document.createElement('cc-license');

  const licenseLabel = 'License';
  const licenseOptions = {
    Attribution: 'by',
    'Attribution-NonCommercial': 'by-nc',
    'Attribution-NonCommercial-NoDerivatives': 'by-nc-nd',
    'Attribution-NonCommercial-ShareAlike': 'by-nc-sa',
    'Attribution-NoDerivatives': 'by-nd',
    'Attribution-ShareAlike': 'by-sa',
  };
  const licenseDefaultValue = 'by';
  const license = select(licenseLabel, licenseOptions, licenseDefaultValue);
  component.setAttribute('license', license);

  const iconLabel = 'Icon';
  const iconOptions = {
    'Normal (88x31)': '88x31',
    'Compact (80x15)': '80x15',
  };
  const iconDefaultValue = '88x31';
  const icon = radios(iconLabel, iconOptions, iconDefaultValue);
  component.setAttribute('icon', icon);

  const componentAttributes: { title: string; attribute: string }[] = [
    {
      title: 'Title of work',
      attribute: 'work-title',
    },
    {
      title: 'Source work URL',
      attribute: 'source',
    },
    {
      title: 'Attribute work to name',
      attribute: 'attribution-title',
    },
    {
      title: 'Attribute work to URL',
      attribute: 'attribution-url',
    },
    {
      title: 'More permissions URL',
      attribute: 'permissions',
    },
  ];

  componentAttributes.forEach((option: { title: string; attribute: string }) => {
    const dataAttribute = text(option.title, '');
    component.setAttribute(option.attribute, dataAttribute);
  });

  const formatLabel = 'Format';
  const formatOptions = {
    Audio: 'Audio',
    Video: 'Video',
    Image: 'Image',
    Text: 'Text',
    Dataset: 'Dataset',
    Interactive: 'Interactive',
  };
  const formatDefaultValue = 'by';
  const format = select(formatLabel, formatOptions, formatDefaultValue);
  component.setAttribute('format', format);

  return component;
};

export const CcLicenseBuilder = (): HTMLElement => {
  const component = document.createElement('cc-license');

  const adaptationsLabel = 'Allow adaptations of your work to be shared?';
  const adaptationsOptions = {
    Yes: 'yes',
    No: 'no',
    'Share-alike': 'share-alike',
  };
  const adaptationsDefaultValue = 'yes';
  const adaptations = select(adaptationsLabel, adaptationsOptions, adaptationsDefaultValue);
  component.setAttribute('adaptations', adaptations);

  const commercialLabel = 'Allow commercial uses of your work?';
  const commercialDefaultValue = true;
  const commercialData = boolean(commercialLabel, commercialDefaultValue);
  const commercial = commercialData ? 'true' : 'false';
  component.setAttribute('commercial', commercial);

  const iconLabel = 'Icon';
  const iconOptions = {
    'Normal (88x31)': '88x31',
    'Compact (80x15)': '80x15',
  };
  const iconDefaultValue = '88x31';
  const icon = radios(iconLabel, iconOptions, iconDefaultValue);
  component.setAttribute('icon', icon);

  const componentAttributes: { title: string; attribute: string }[] = [
    {
      title: 'Title of work',
      attribute: 'work-title',
    },
    {
      title: 'Source work URL',
      attribute: 'source',
    },
    {
      title: 'Attribute work to name',
      attribute: 'attribution-title',
    },
    {
      title: 'Attribute work to URL',
      attribute: 'attribution-url',
    },
    {
      title: 'More permissions URL',
      attribute: 'permissions',
    },
  ];

  componentAttributes.forEach((option: { title: string; attribute: string }) => {
    const dataAttribute = text(option.title, '');
    component.setAttribute(option.attribute, dataAttribute);
  });

  const formatLabel = 'Format';
  const formatOptions = {
    Audio: 'Audio',
    Video: 'Video',
    Image: 'Image',
    Text: 'Text',
    Dataset: 'Dataset',
    Interactive: 'Interactive',
  };
  const formatDefaultValue = 'by';
  const format = select(formatLabel, formatOptions, formatDefaultValue);
  component.setAttribute('format', format);

  return component;
};
