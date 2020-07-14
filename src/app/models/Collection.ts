import { serializeAs, deserializeAs } from 'cerialize';
export class Collection {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('background_color')
    @deserializeAs('background_color')
    private _background_color: string;

    @deserializeAs('isSelected')
    private _isSelected: boolean;

    @serializeAs('user_id')
    @deserializeAs('user_id')
    private _user_id: number;

    @serializeAs('collection_id')
    private _collection_id: number;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    constructor() {

    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter background_color
     * @return {string}
     */
    public get background_color(): string {
        return this._background_color;
    }

    /**
     * Getter user_id
     * @return {number}
     */
    public get user_id(): number {
        return this._user_id;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter background_color
     * @param {string} value
     */
    public set background_color(value: string) {
        this._background_color = value;
    }

    /**
     * Setter user_id
     * @param {number} value
     */
    public set user_id(value: number) {
        this._user_id = value;
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
     * Getter isSelected
     * @return {boolean}
     */
    public get isSelected(): boolean {
        return this._isSelected;
    }

    /**
     * Setter isSelected
     * @param {boolean} value
     */
    public set isSelected(value: boolean) {
        this._isSelected = value;
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

}
