import { serializeAs, deserializeAs } from 'cerialize';
import { MetaData } from './Meta-Data';
export class Assets {
    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('user_id')
    @deserializeAs('user_id')
    private _user_id: number;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('path')
    @deserializeAs('path')
    private _path: string;

    @serializeAs('key')
    @deserializeAs('key')
    private _key: string;

    @serializeAs('version_key')
    @deserializeAs('version_key')
    private _version_key: string;

    @serializeAs('parent_id')
    @deserializeAs('parent_id')
    private _parent_id: number;

    @serializeAs('asset_type')
    @deserializeAs('asset_type')
    private _asset_type: string;

    @serializeAs('file_type')
    @deserializeAs('file_type')
    private _file_type: string;

    @deserializeAs('file')
    private _file: File;

    @deserializeAs('progress')
    private _progress: number;

    @serializeAs('asset_size')
    @deserializeAs('asset_size')
    private _asset_size: number;

    @serializeAs('version_parent_id')
    @deserializeAs('version_parent_id')
    private _version_parent_id: number;

    @serializeAs('replace')
    @deserializeAs('replace')
    private _replace: boolean;

    // @serializeAs('isCopyReplace')
    @deserializeAs('isCopyReplace')
    private _isCopyReplace: boolean;

    @deserializeAs('isCanceled')
    private _isCanceled: boolean;

    @deserializeAs('uploadId')
    private _uploadId: string;

    // @serializeAs('status')
    @deserializeAs('status')
    private _status: string;

    @serializeAs('thumb_url')
    @deserializeAs('thumb_url')
    private _thumb_url: string;

    @serializeAs('video_url')
    @deserializeAs('video_url')
    private _video_url: string;

    @serializeAs('meta_data')
    @deserializeAs('meta_data')
    private _meta_data: object;

    @serializeAs('version')
    @deserializeAs('version')
    private _version: number;

    @serializeAs('offset')
    @deserializeAs('offset')
    private _offset: number;


    @serializeAs('isPermission')
    @deserializeAs('isPermission')
    private _isPermission: boolean;

    @serializeAs('user_tags')
    @deserializeAs('user_tags')
    private _user_tags: Array<string>;

    @serializeAs('smart_tags')
    @deserializeAs('smart_tags')
    private _smart_tags: Array<string>;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    @serializeAs('sub')
    @deserializeAs('sub')
    private _sub: Array<Assets>;

    @serializeAs('meta_fields_data')
    @deserializeAs('meta_fields_data')
    private _meta_fields_data: any;


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
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter parent_id
     * @return {number}
     */
    public get parent_id(): number {
        return this._parent_id;
    }

    /**
     * Getter asset_type
     * @return {string}
     */
    public get asset_type(): string {
        return this._asset_type;
    }

    /**
     * Getter file_type
     * @return {string}
     */
    public get file_type(): string {
        return this._file_type;
    }

    /**
     * Getter thumb_url
     * @return {string}
     */
    public get thumb_url(): string {
        return this._thumb_url;
    }

    /**
     * Getter sub
     * @return {Array<Assets>}
     */
    public get sub(): Array<Assets> {
        return this._sub;
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
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter parent_id
     * @param {number} value
     */
    public set parent_id(value: number) {
        this._parent_id = value;
    }

    /**
     * Setter asset_type
     * @param {string} value
     */
    public set asset_type(value: string) {
        this._asset_type = value;
    }

    /**
     * Setter file_type
     * @param {string} value
     */
    public set file_type(value: string) {
        this._file_type = value;
    }

    /**
     * Setter thumb_url
     * @param {string} value
     */
    public set thumb_url(value: string) {
        this._thumb_url = value;
    }

    /**
     * Setter sub
     * @param {Array<Assets>} value
     */
    public set sub(value: Array<Assets>) {
        this._sub = value;
    }



    /**
     * Getter path
     * @return {string}
     */
    public get path(): string {
        return this._path;
    }

    /**
     * Setter path
     * @param {string} value
     */
    public set path(value: string) {
        this._path = value;
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
     * Getter meta_data
     * @return {object}
     */
    public get meta_data(): object {
        return this._meta_data;
    }

    /**
     * Setter meta_data
     * @param {object} value
     */
    public set meta_data(value: object) {
        this._meta_data = value;
    }

    /**
     * Getter version
     * @return {number}
     */
    public get version(): number {
        return this._version;
    }

    /**
     * Setter version
     * @param {number} value
     */
    public set version(value: number) {
        this._version = value;
    }

    /**
     * Getter key
     * @return {string}
     */
    public get key(): string {
        return this._key;
    }

    /**
     * Setter key
     * @param {string} value
     */
    public set key(value: string) {
        this._key = value;
    }

    /**
     * Getter file
     * @return {File}
     */
    public get file(): File {
        return this._file;
    }

    /**
     * Getter asset_size
     * @return {number}
     */
    public get asset_size(): number {
        return this._asset_size;
    }

    /**
     * Setter file
     * @param {File} value
     */
    public set file(value: File) {
        this._file = value;
    }

    /**
     * Setter asset_size
     * @param {number} value
     */
    public set asset_size(value: number) {
        this._asset_size = value;
    }

    /**
     * Getter progress
     * @return {number}
     */
    public get progress(): number {
        return this._progress;
    }

    /**
     * Setter progress
     * @param {number} value
     */
    public set progress(value: number) {
        this._progress = value;
    }

    /**
     * Getter version_key
     * @return {string}
     */
    public get version_key(): string {
        return this._version_key;
    }

    /**
     * Setter version_key
     * @param {string} value
     */
    public set version_key(value: string) {
        this._version_key = value;
    }

    /**
     * Getter replace
     * @return {boolean}
     */
    public get replace(): boolean {
        return this._replace;
    }

    /**
     * Setter replace
     * @param {boolean} value
     */
    public set replace(value: boolean) {
        this._replace = value;
    }

    /**
     * Getter status
     * @return {string}
     */
    public get status(): string {
        return this._status;
    }

    /**
     * Setter status
     * @param {string} value
     */
    public set status(value: string) {
        this._status = value;
    }

    /**
     * Getter isCopyReplace
     * @return {boolean}
     */
    public get isCopyReplace(): boolean {
        return this._isCopyReplace;
    }

    /**
     * Setter isCopyReplace
     * @param {boolean} value
     */
    public set isCopyReplace(value: boolean) {
        this._isCopyReplace = value;
    }

    /**
     * Getter user_tags
     * @return {Array<string>}
     */
    public get user_tags(): Array<string> {
        return this._user_tags;
    }

    /**
     * Getter smart_tags
     * @return {Array<string>}
     */
    public get smart_tags(): Array<string> {
        return this._smart_tags;
    }

    /**
     * Setter user_tags
     * @param {Array<string>} value
     */
    public set user_tags(value: Array<string>) {
        this._user_tags = value;
    }

    /**
     * Setter smart_tags
     * @param {Array<string>} value
     */
    public set smart_tags(value: Array<string>) {
        this._smart_tags = value;
    }

    /**
     * Getter video_url
     * @return {string}
     */
    public get video_url(): string {
        return this._video_url;
    }

    /**
     * Setter video_url
     * @param {string} value
     */
    public set video_url(value: string) {
        this._video_url = value;
    }

    /**
     * Getter offset
     * @return {number}
     */
    public get offset(): number {
        return this._offset;
    }

    /**
     * Setter offset
     * @param {number} value
     */
    public set offset(value: number) {
        this._offset = value;
    }

    /**
     * Getter version_parent_id
     * @return {number}
     */
    public get version_parent_id(): number {
        return this._version_parent_id;
    }

    /**
     * Setter version_parent_id
     * @param {number} value
     */
    public set version_parent_id(value: number) {
        this._version_parent_id = value;
    }

    /**
     * Getter isPermission
     * @return {boolean}
     */
    public get isPermission(): boolean {
        return this._isPermission;
    }

    /**
     * Setter isPermission
     * @param {boolean} value
     */
    public set isPermission(value: boolean) {
        this._isPermission = value;
    }

    /**
     * Getter isCanceled
     * @return {boolean}
     */
    public get isCanceled(): boolean {
        return this._isCanceled;
    }

    /**
     * Setter isCanceled
     * @param {boolean} value
     */
    public set isCanceled(value: boolean) {
        this._isCanceled = value;
    }

    /**
     * Getter uploadId
     * @return {string}
     */
    public get uploadId(): string {
        return this._uploadId;
    }

    /**
     * Setter uploadId
     * @param {string} value
     */
    public set uploadId(value: string) {
        this._uploadId = value;
    }

    /**
     * Getter meta_fields_data
     * @return {any}
     */
    public get meta_fields_data(): any {
        return this._meta_fields_data;
    }

    /**
     * Setter meta_fields_data
     * @param {any} value
     */
    public set meta_fields_data(value: any) {
        this._meta_fields_data = value;
    }

}
