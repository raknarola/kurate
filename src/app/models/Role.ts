import { serializeAs, deserializeAs } from 'cerialize';
export class Role {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('description')
    @deserializeAs('description')
    private _description: string;

    @serializeAs('role_id')
    @deserializeAs('role_id')
    private _role_id: number;

    @serializeAs('permission')
    @deserializeAs('permission')
    private _permission: any;

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
     * Getter description
     * @return {string}
     */
    public get description(): string {
        return this._description;
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
     * Setter description
     * @param {string} value
     */
    public set description(value: string) {
        this._description = value;
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
     * Getter role_id
     * @return {number}
     */
    public get role_id(): number {
        return this._role_id;
    }

    /**
     * Setter role_id
     * @param {number} value
     */
    public set role_id(value: number) {
        this._role_id = value;
    }

    /**
     * Getter permission
     * @return {any}
     */
    public get permission(): any {
        return this._permission;
    }

    /**
     * Setter permission
     * @param {any} value
     */
    public set permission(value: any) {
        this._permission = value;
    }


}
