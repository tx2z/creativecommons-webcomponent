/**
 * Add here the custom interfaces that will be used in the component
 */
/**
 * The data of the license
 */
export interface License {
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  metadata?: LicenseMetadata;
}
export interface LicenseMetadata {
  workTitle?: string;
  source?: string;
  attributionTitle?: string;
  attributionUrl?: string;
  permissions?: string;
  format?: string;
}

export interface TemplateVariables {
  url: string;
  imageWidth: number;
  imageHeight: number;
  image: string;
  title: string;
  work: string;
  attribution: string;
  source: string;
  permissions: string;
}
// format?: 'Sound' | 'MovingImage' | 'StillImage' | 'Text' | 'Dataset' | 'InteractiveResource';
export type Adaptations = 'yes' | 'no' | 'share-alike';
export type IconSize = '88x31' | '80x15';
export type Licenses = 'by' | 'by-nc' | 'by-nc-nd' | 'by-nc-sa' | 'by-nd' | 'by-sa';
