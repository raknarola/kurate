import { serializeAs, deserializeAs } from 'cerialize';

export class Organization {
    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: string;

    @serializeAs('prefix')
    @deserializeAs('prefix')
    private _prefix: string;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    @serializeAs('StorageEndpoint')
    @deserializeAs('StorageEndpoint')
    private _StorageEndpoint: string;

    @serializeAs('BucketName')
    @deserializeAs('BucketName')
    private _BucketName: string;

    @serializeAs('CDNEndpoint')
    @deserializeAs('CDNEndpoint')
    private _CDNEndpoint: string;

    @serializeAs('StorageSaltKey')
    @deserializeAs('StorageSaltKey')
    private _StorageSaltKey: string;

    @serializeAs('DBName')
    @deserializeAs('DBName')
    private _DBName: string;

    @serializeAs('allowedUser')
    @deserializeAs('allowedUser')
    private _allowedUser: number;

    @serializeAs('total_user')
    @deserializeAs('total_user')
    private _total_user: number;





    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter email
     * @return {string}
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
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
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
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
     * Getter prefix
     * @return {string}
     */
    public get prefix(): string {
        return this._prefix;
    }

    /**
     * Setter prefix
     * @param {string} value
     */
    public set prefix(value: string) {
        this._prefix = value;
    }

    /**
     * Getter StorageEndpoint
     * @return {string}
     */
    public get StorageEndpoint(): string {
        return this._StorageEndpoint;
    }

    /**
     * Getter BucketName
     * @return {string}
     */
    public get BucketName(): string {
        return this._BucketName;
    }

    /**
     * Getter CDNEndpoint
     * @return {string}
     */
    public get CDNEndpoint(): string {
        return this._CDNEndpoint;
    }

    /**
     * Getter StorageSaltKey
     * @return {string}
     */
    public get StorageSaltKey(): string {
        return this._StorageSaltKey;
    }

    /**
     * Getter DBName
     * @return {string}
     */
    public get DBName(): string {
        return this._DBName;
    }

    /**
     * Setter StorageEndpoint
     * @param {string} value
     */
    public set StorageEndpoint(value: string) {
        this._StorageEndpoint = value;
    }

    /**
     * Setter BucketName
     * @param {string} value
     */
    public set BucketName(value: string) {
        this._BucketName = value;
    }

    /**
     * Setter CDNEndpoint
     * @param {string} value
     */
    public set CDNEndpoint(value: string) {
        this._CDNEndpoint = value;
    }

    /**
     * Setter StorageSaltKey
     * @param {string} value
     */
    public set StorageSaltKey(value: string) {
        this._StorageSaltKey = value;
    }

    /**
     * Setter DBName
     * @param {string} value
     */
    public set DBName(value: string) {
        this._DBName = value;
    }

    /**
     * Getter allowedUser
     * @return {number}
     */
    public get allowedUser(): number {
        return this._allowedUser;
    }

    /**
     * Getter total_user
     * @return {number}
     */
    public get total_user(): number {
        return this._total_user;
    }

    /**
     * Setter allowedUser
     * @param {number} value
     */
    public set allowedUser(value: number) {
        this._allowedUser = value;
    }

    /**
     * Setter total_user
     * @param {number} value
     */
    public set total_user(value: number) {
        this._total_user = value;
    }

}
