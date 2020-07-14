import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }


  /* MAX length Varibles*/
  MAX_30 = 30;
  MAX_2000 = 2000;
  MAX_100 = 100;
  MAX_60 = 60;
  MAX_20 = 20;
  MAX_10 = 10;
  MAX_15 = 15;
  MAX_4 = 4;
  MAX_5 = 5;
  MAX_3 = 3;
  MAX_32 = 32;
  MAX_50 = 50;
  MAX_300 = 300;
  MAX_13 = 13;
  MAX_6 = 6;
  MAX_7 = 7;
  MAX_8 = 8;
  MAX_11 = 11;
  MAX_12 = 12;
  MAX_25 = 25;
  PASSWORD = 32;
  EMAIL = 50;

  /* pattern use for validation */
  NAME = /^([a-zA-Z][a-zA-Z\s]*)$/; // use in specilstMaster and CategoryMaster
  STATE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
  CITY_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
  LANGUAGE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
  ONLY_NUMBERS = '^[0-9]*$';
  // ONLY_NUMBERS_AND_DOT = /^[0-9.]{1,15}$/;
  ONLY_NUMBERS_AND_DOT = /^[0-9]+(?:\.[0-9]+)?$/;
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH_DIGIT = '^[a-zA-Z0-9- ]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_COMMA = '^[a-zA-Z0-9\' ]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH = '^[a-zA-Z- ]*$';
  // PATTERN_FOR_ALPHABATES_AND_SPACE_AND_ROUND_BRACKETS = '^[a-zA-Z() ]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_ROUND_BRACKETS = '^([a-zA-Z()][a-zA-Z() ]*)';
  LAB_MASTER_NAME = /.*\S.*/;
  // ONLY_SPACE_NOT_ALLOW = /^\S*$/;
  ONLY_SPACE_NOT_ALLOW = /.*\S.*/;

  LEADING_SPACE_NOT_ALLOW = /^([a-zA-Z0-9][a-zA-Z0-9\s]*)/;
  PATTERN_FOR_USER_ROLE_NAME = /^([a-zA-Z][a-zA-Z[\_\]\s]*)$/; // added by Dhrumin
  PATTERN_FOR_USER_NAME_WITH_DOT = /^([a-zA-Z][a-zA-Z[\.\]\s]*)$/; // added by Dhrumin
  PATTERN_FOR_USER_NAME_WITH_UNDERSCORE = /^([a-zA-Z0-9][a-zA-Z0-9[\_\]\s]*)$/; // added by Dhrumin
  PATTERN_FOR_PREFIX = '^([a-zA-Z0-9][a-zA-Z0-9\s!@#$%^&*()-_]*)';
  STARTING_WITH_ALPHABATES_AND_DIGIT = /^(\w|\d)([A-z\d_@.#$=!%^)(\]:\*;\?\/\,}{ '\|<>\[&\+-]*)$/; // added by ashish
  PATTERN_FOR_ALPHANUMERIC_DIGIT_SPECIAL_ESCAPE_CHARS = /.*\S.*/;
  PATTERN_FOR_ONLY_ALPHABATES = '^[a-zA-Z]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT = '^[a-zA-Z0-9 ]*$';
  PATTERN_FOR_ALPHABATES_AND_DIGIT = '^[a-zA-Z0-9]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE = '^([a-zA-Z][a-zA-Z ]*)$';
  PATTERN_FOR_ALPHABATES_AND_ORG_NAME = '^([a-zA-Z][a-zA-Z .&$@]*)$';
  PATTERN_FOR_ALPHABATES_NUMBER_AND_SPACE = '^([a-zA-Z0-9][a-zA-Z0-9 ]*)';
  // PATTERN_FOR_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  PATTERN_FOR_EMAIL = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,50}'; // change by ashish
  // PATTERN_FOR_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // PATTERN_FOR_EMAIL = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.' +
  //   '[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  // PATTERN_FOR_EMAIL = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  PATTERN_FOR_EMAIL_OR_PHONE_NO = '^(?:([a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10,13}))$';
  PATTERN_FOR_EMAIL_OR_USERNAME = '^(?:([a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([a-zA-Z0-9]*))$';
  PATTERN_FOR_PHONE_NO = '^[0-9]{10}$';
  PATTERN_FOR_NUMBER = '^[0-9]*$';
  PATTERN_FOR_DECIMAL_NUMBER = '^[0-9.]*$';
  PATTERN_FOR_PINCODE = '^[0-9]{6}$';
  PATTERN_FOR_LANDLINE_NO = '^[0-9]{11}$';
  PATTERN_FOR_ADHARCARD_NO = '^[0-9]{12}$';
  PATTERN_FOR_HSN_CODE = '^[0-9]{8}$';
  PATTERN_FOR_SAC_CODE = '^[0-9]{6}$';
  PATTERN_FOR_PANCARD_NO = '^[A-Z]{5}[0-9]{4}[A-Z]{1}$';
  PATTERN_FOR_NOTARY_CERTIFICATE_NUMBER = /[A-Z]{2}\d{4}[\/]\d{4}/;
  PATTERN_FOR_DRIVING_LICENCE_NUMBER = /[A-Z]{2}\d{13}/;

  PATTERN_FOR_NAME_WITH_COMA_AND_SPACE = /^([a-zA-Z][a-zA-Z, ]*)$/;
  PATTERN_FOR_NAME_WITH_DASH_SLASH_AND_SPACE = /^([a-zA-Z][a-zA-Z-/ ]*)$/;
  PATTERN_FOR_NAME_WITH_COMA_CIRCLE_BRACKETS = /^([a-zA-Z][a-zA-Z,() ]*)$/;
  PATTERN_FOR_NAME_WITH_EMPERSON_AND_SPACE = /^([a-zA-Z][a-zA-Z& ]*)$/;

  PATTERN_FOR_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%-_*#?&])[A-Za-z\d$@$!%-_*#?&]{6,32}$/;
  // PATTERN_FOR_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,32}$/;
  PATTERN_FOR_BAR_COUNCIL_NO = /[a-zA-Z]{2}[\/]\d[0-9]{0,5}[\/][0-9]{4}/;
  PATTERN_FOR_GST_NO = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/;
  PATTERN_FOR_NUMBER_PLATE = '^[a-zA-Z]{2}[ -][0-9]{1,2}(?: [a-zA-Z])?(?: [a-zA-Z]*)? [0-9]{4}$';
  PATTERN_NOT_ALLOW_SPACE = /^\S*$/;
  PATTERN_FOR_DATE = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  /* End pattern use for validation */

  EMAIL_REQUIRED = 'Email is required!';
  EMAIL_INVALID = 'Please enter a valid Email.';
  PASSWORD_REQUIRED = 'Password is required!';
  PASSWORD_INVALID = 'Should contains atleast 6 characters,one upper case letter,lower case letter,digit and special character like *,@,$.-_';

  // User Details Validation msg

  REQUIRED_FOR_NAME = 'Name is required.';
  INVALID_FOR_NAME = 'Please enter valid Name.';
  REQUIRED_FOR_USERNAME = 'User name is required.';
  INVALID_FOR_USERNAME = 'Please enter valid User name.';
  REQUIRED_FOR_EMAIL = 'Email address is required.';
  INVALID_FOR_EMAIL = 'Please enter valid email address.';
  REQUIRED_FOR_PASSWORD = 'Password is required.';
  FIRST_NAME_REQUIRED = 'First Name is required!';
  FIRST_NAME_INVALID = 'Please enter a valid First Name.';
  LAST_NAME_REQUIRED = 'Last Name is required!';
  LAST_NAME_INVALID = 'Please enter a valid Last Name.';
  ROLE_REQUIRED = 'Role is required.';

  // Role Validation msg

  ROLE_NAME_REQUIRED = 'Role Name is required!';
  ROLE_NAME_INVALID = 'Please enter a valid Role Name.';

  // Collection Validation Msg

  COLLECTION_NAME_REQUIRED = 'Collection Name is required!';
  COLLECTION_NAME_INVALID = 'Please enter a valid Collection Name.';
  // Share Validation Msg

  SHARE_NAME_REQUIRED = 'Share Name is required!';
  SHARE_NAME_INVALID = 'Please enter a valid Share Name.';

  EXPIRE_DATE_REQUIRED = 'Expire Date is required!';
  EXPIRE_DATE_INVALID = 'Please enter a valid Expire Date.';


  DOWNLOAD_ALLOWED_REQUIRED = 'Download Allowed is required!';
  DOWNLOAD_ALLOWED_INVALID = 'Please enter a valid Download Allowed.';

  COLOR_REQUIRED = 'Color is required!';

  FROM_DATE_REQUIRED = 'From Date is required!';
  TO_DATE_REQUIRED = 'To Date is required!';

  FOLDER_NAME_REQUIRED = 'Folder Name is required!';
  FOLDER_NAME_INVALID = 'Please enter a valid Folder Name.';

  // Meta Module Fields Msg

  TITLE_REQUIRED = 'Title is required!';
  TITLE_INVALID = 'Please enter a valid Title.';

  USE_TILL_DATE_REQUIRED = 'Use Asset Till  is required!';

  ASSET_KEYS_REQUIRED = 'Asset Keys  is required!';

  // Meta Config Fields Msg
  ELEMENT_TYPE_REQUIRED = 'Element Type  is required!';
  STATUS_REQUIRED = 'Status  is required!';


}
