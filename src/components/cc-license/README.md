# Creative Commons license generator as web component

Encapsulate the html code from the [Creative Commons license 'Choose a license' form](https://creativecommons.org/choose/) in a web component.

You can define your license and license metadata through the component attributes.

## Use

There are two options to use the component.

### Integrate it in your javascript project

``` js
npm i creative-commons-web-component
```

And import it in your js file:

``` js
import 'creative-commons-web-component'
```

Then use it in your html or js template

``` html
<cc-license [attributes?]></cc-license>
```

### Use it directly in your page

``` html
<script src="ccLicense.dist.js"></script>
<cc-license [attributes?]></cc-license>
```

## Attributes

All attributes are optional

| Attribute           | Type                                             | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `license`           | `'by' | 'by-nc' | 'by-nc-nd' | 'by-nc-sa' | 'by-nd' | 'by-sa'` | Choose the license (overwrites adaptations & commercial) |
| `adaptations`       | `'yes' | 'no' | 'share-alike'`                 | Allow adaptations of your work to be shared?     |
| `commercial`        | `Boolean`                                        | Allow commercial uses of your work?              |
| `icon`              | `'88x31' | '80x15'`                             | The icon size                                    |
| `work-title`        | `String`                                         | The title of the work you are licensing.         |
| `attribution-title` | `String`                                         | The name of the person who should receive attribution for the work. Most often, this is the author. |
| `attribution-url`   | `String`                                         | The URL to which the work should be attributed.  |
| `permissions`       | `String`                                         | A URL where a user can find information about obtaining rights that are not already permitted by the CC license. |
| `source`            | `String`                                         | The URL of the work upon which this work is based or derived. |
| `format`            | `'audio' | 'video' | 'image' | 'text' | 'dataset' | 'interactive'` | Describes what kind of work is being licensed.   |
