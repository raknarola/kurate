import { serializeAs, deserializeAs } from 'cerialize';
export class Tags {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('color')
    @deserializeAs('color')
    private _color: string;

    @serializeAs('created_by')
    @deserializeAs('created_by')
    private _created_by: string;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;



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
     * Getter color
     * @return {string}
     */
    public get color(): string {
        return this._color;
    }

    /**
     * Getter created_by
     * @return {string}
     */
    public get created_by(): string {
        return this._created_by;
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
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter color
     * @param {string} value
     */
    public set color(value: string) {
        this._color = value;
    }

    /**
     * Setter created_by
     * @param {string} value
     */
    public set created_by(value: string) {
        this._created_by = value;
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
