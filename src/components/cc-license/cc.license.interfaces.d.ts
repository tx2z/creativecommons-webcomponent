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
}
export type Adaptations = 'yes' | 'no' | 'share-alike';
export type IconSize = '88x31' | '80x15';
export type Licenses = 'by' | 'by-nc' | 'by-nc-nd' | 'by-nc-sa' | 'by-nd' | 'by-sa';
