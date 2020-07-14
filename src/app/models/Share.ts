import { serializeAs, deserializeAs } from 'cerialize';
import { Assets } from './Assets';
import { UserDetails } from './UserDetails';
export class Share {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('created_by')
    @deserializeAs('created_by')
    private _created_by: number;

    @serializeAs('asset_id')
    @deserializeAs('asset_id')
    private _asset_id: number;

    @serializeAs('collection_id')
    @deserializeAs('collection_id')
    private _collection_id: number;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('link_token')
    @deserializeAs('link_token')
    private _link_token: string;

    @serializeAs('expire_date')
    @deserializeAs('expire_date')
    private _expire_date: string;

    @serializeAs('is_expire')
    @deserializeAs('is_expire')
    private _is_expire: any;

    @serializeAs('access_type')
    @deserializeAs('access_type')
    private _access_type: number;

    @serializeAs('share_type')
    @deserializeAs('share_type')
    private _share_type: number;

    @serializeAs('allow_downloads')
    @deserializeAs('allow_downloads')
    private _allow_downloads: number;

    @serializeAs('user')
    @deserializeAs('user')
    private _user: UserDetails;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    @serializeAs('assets_data')
    @deserializeAs('assets_data')
    private _assets_data: Array<Assets>;


    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter created_by
     * @return {number}
     */
    public get created_by(): number {
        return this._created_by;
    }

    /**
     * Getter asset_id
     * @return {number}
     */
    public get asset_id(): number {
        return this._asset_id;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter link_token
     * @return {string}
     */
    public get link_token(): string {
        return this._link_token;
    }

    /**
     * Getter expire_date
     * @return {string}
     */
    public get expire_date(): string {
        return this._expire_date;
    }


    /**
     * Getter access_type
     * @return {number}
     */
    public get access_type(): number {
        return this._access_type;
    }

    /**
     * Getter allow_downloads
     * @return {number}
     */
    public get allow_downloads(): number {
        return this._allow_downloads;
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
     * Setter created_by
     * @param {number} value
     */
    public set created_by(value: number) {
        this._created_by = value;
    }

    /**
     * Setter asset_id
     * @param {number} value
     */
    public set asset_id(value: number) {
        this._asset_id = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter link_token
     * @param {string} value
     */
    public set link_token(value: string) {
        this._link_token = value;
    }

    /**
     * Setter expire_date
     * @param {string} value
     */
    public set expire_date(value: string) {
        this._expire_date = value;
    }


    /**
     * Setter access_type
     * @param {number} value
     */
    public set access_type(value: number) {
        this._access_type = value;
    }

    /**
     * Setter allow_downloads
     * @param {number} value
     */
    public set allow_downloads(value: number) {
        this._allow_downloads = value;
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
     * Getter is_expire
     * @return {any}
     */
    public get is_expire(): any {
        return this._is_expire;
    }

    /**
     * Setter is_expire
     * @param {any} value
     */
    public set is_expire(value: any) {
        this._is_expire = value;
    }


    /**
     * Getter share_type
     * @return {number}
     */
    public get share_type(): number {
        return this._share_type;
    }

    /**
     * Setter share_type
     * @param {number} value
     */
    public set share_type(value: number) {
        this._share_type = value;
    }

    /**
     * Getter collection_id
     * @return {number}
     */
    public get collection_id(): number {
        return this._collection_id;
    }

    /**
     * Setter collection_id
     * @param {number} value
     */
    public set collection_id(value: number) {
        this._collection_id = value;
    }


    /**
     * Getter assets_data
     * @return {Array<Assets>}
     */
    public get assets_data(): Array<Assets> {
        return this._assets_data;
    }

    /**
     * Setter assets_data
     * @param {Array<Assets>} value
     */
    public set assets_data(value: Array<Assets>) {
        this._assets_data = value;
    }


    /**
     * Getter user
     * @return {UserDetails}
     */
    public get user(): UserDetails {
        return this._user;
    }

    /**
     * Setter user
     * @param {UserDetails} value
     */
    public set user(value: UserDetails) {
        this._user = value;
    }

}
