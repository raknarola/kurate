import { serializeAs, deserializeAs } from 'cerialize';
export class MetaData {

  @serializeAs('id')
  @deserializeAs('id')
  private _id: number;

  @serializeAs('field_name')
  @deserializeAs('field_name')
  private _field_name: string;

  @serializeAs('name')
  @deserializeAs('name')
  private _name: string;

  @serializeAs('description')
  @deserializeAs('description')
  private _description: string;

  @serializeAs('input_type')
  @deserializeAs('input_type')
  private _input_type: string;

  @serializeAs('values')
  @deserializeAs('values')
  private _values: Array<string>;

  @serializeAs('status')
  @deserializeAs('status')
  private _status: string;

  @serializeAs('created_at')
  @deserializeAs('created_at')
  private _created_at: string;

  @serializeAs('updated_at')
  @deserializeAs('updated_at')
  private _updated_at: string;

  @serializeAs('ngModel')
  @deserializeAs('ngModel')
  private _ngModel: any;



  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter field_name
   * @return {string}
   */
  public get field_name(): string {
    return this._field_name;
  }

  /**
   * Getter description
   * @return {string}
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Getter input_type
   * @return {string}
   */
  public get input_type(): string {
    return this._input_type;
  }

  /**
   * Getter values
   * @return {Array<string>}
   */
  public get values(): Array<string> {
    return this._values;
  }

  /**
   * Getter status
   * @return {string}
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Getter created_at
   * @return {string}
   */
  public get created_at(): string {
    return this._created_at;
  }

  /**
   * Getter updated_at
   * @return {string}
   */
  public get updated_at(): string {
    return this._updated_at;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter field_name
   * @param {string} value
   */
  public set field_name(value: string) {
    this._field_name = value;
  }

  /**
   * Setter description
   * @param {string} value
   */
  public set description(value: string) {
    this._description = value;
  }

  /**
   * Setter input_type
   * @param {string} value
   */
  public set input_type(value: string) {
    this._input_type = value;
  }

  /**
   * Setter values
   * @param {Array<string>} value
   */
  public set values(value: Array<string>) {
    this._values = value;
  }

  /**
   * Setter status
   * @param {string} value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Setter created_at
   * @param {string} value
   */
  public set created_at(value: string) {
    this._created_at = value;
  }

  /**
   * Setter updated_at
   * @param {string} value
   */
  public set updated_at(value: string) {
    this._updated_at = value;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }


  /**
   * Getter ngModel
   * @return {any}
   */
  public get ngModel(): any {
    return this._ngModel;
  }

  /**
   * Setter ngModel
   * @param {any} value
   */
  public set ngModel(value: any) {
    this._ngModel = value;
  }

}
