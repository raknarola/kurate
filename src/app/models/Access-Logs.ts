import { serializeAs, deserializeAs } from 'cerialize';
export class AccessLog {

  @serializeAs('id')
  @deserializeAs('id')
  private _id: number;

  @serializeAs('user_id')
  @deserializeAs('user_id')
  private _user_id: number;

  @serializeAs('organization_id')
  @deserializeAs('organization_id')
  private _organization_id: number;

  @serializeAs('description')
  @deserializeAs('description')
  private _description: string;

  @serializeAs('username')
  @deserializeAs('username')
  private _username: string;

  @serializeAs('organization_name')
  @deserializeAs('organization_name')
  private _organization_name: string;

  @serializeAs('ip')
  @deserializeAs('ip')
  private _ip: string;

  @serializeAs('created_at')
  @deserializeAs('created_at')
  private _created_at: string;


  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter user_id
   * @return {number}
   */
  public get user_id(): number {
    return this._user_id;
  }

  /**
   * Getter organization_id
   * @return {number}
   */
  public get organization_id(): number {
    return this._organization_id;
  }

  /**
   * Getter description
   * @return {string}
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Getter ip
   * @return {string}
   */
  public get ip(): string {
    return this._ip;
  }

  /**
   * Getter created_at
   * @return {string}
   */
  public get created_at(): string {
    return this._created_at;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter user_id
   * @param {number} value
   */
  public set user_id(value: number) {
    this._user_id = value;
  }

  /**
   * Setter organization_id
   * @param {number} value
   */
  public set organization_id(value: number) {
    this._organization_id = value;
  }

  /**
   * Setter description
   * @param {string} value
   */
  public set description(value: string) {
    this._description = value;
  }

  /**
   * Setter ip
   * @param {string} value
   */
  public set ip(value: string) {
    this._ip = value;
  }

  /**
   * Setter created_at
   * @param {string} value
   */
  public set created_at(value: string) {
    this._created_at = value;
  }

    /**
     * Getter username
     * @return {string}
     */
	public get username(): string {
		return this._username;
	}

    /**
     * Getter organization_name
     * @return {string}
     */
	public get organization_name(): string {
		return this._organization_name;
	}

    /**
     * Setter username
     * @param {string} value
     */
	public set username(value: string) {
		this._username = value;
	}

    /**
     * Setter organization_name
     * @param {string} value
     */
	public set organization_name(value: string) {
		this._organization_name = value;
	}

}
