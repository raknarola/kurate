import { serializeAs, deserializeAs } from 'cerialize';
export class Permissions {

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('permission')
    @deserializeAs('permission')
    private _permission: Permissions;

    @serializeAs('isView')
    @deserializeAs('isView')
    private _isView: boolean;

    @serializeAs('isDelete')
    @deserializeAs('isDelete')
    private _isDelete: boolean;

    @serializeAs('isRename')
    @deserializeAs('isRename')
    private _isRename: boolean;

    @serializeAs('isCreate')
    @deserializeAs('isCreate')
    private _isCreate: boolean;

    @serializeAs('isVersion')
    @deserializeAs('isVersion')
    private _isVersion: boolean;

    @serializeAs('isWorkFlow')
    @deserializeAs('isWorkFlow')
    private _isWorkFlow: boolean;


    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter isView
     * @return {boolean}
     */
    public get isView(): boolean {
        return this._isView;
    }

    /**
     * Getter isDelete
     * @return {boolean}
     */
    public get isDelete(): boolean {
        return this._isDelete;
    }

    /**
     * Getter isRename
     * @return {boolean}
     */
    public get isRename(): boolean {
        return this._isRename;
    }

    /**
     * Getter isCreate
     * @return {boolean}
     */
    public get isCreate(): boolean {
        return this._isCreate;
    }

    /**
     * Getter isVersion
     * @return {boolean}
     */
    public get isVersion(): boolean {
        return this._isVersion;
    }

    /**
     * Getter isWorkFlow
     * @return {boolean}
     */
    public get isWorkFlow(): boolean {
        return this._isWorkFlow;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter isView
     * @param {boolean} value
     */
    public set isView(value: boolean) {
        this._isView = value;
    }

    /**
     * Setter isDelete
     * @param {boolean} value
     */
    public set isDelete(value: boolean) {
        this._isDelete = value;
    }

    /**
     * Setter isRename
     * @param {boolean} value
     */
    public set isRename(value: boolean) {
        this._isRename = value;
    }

    /**
     * Setter isCreate
     * @param {boolean} value
     */
    public set isCreate(value: boolean) {
        this._isCreate = value;
    }

    /**
     * Setter isVersion
     * @param {boolean} value
     */
    public set isVersion(value: boolean) {
        this._isVersion = value;
    }

    /**
     * Setter isWorkFlow
     * @param {boolean} value
     */
    public set isWorkFlow(value: boolean) {
        this._isWorkFlow = value;
    }


    /**
     * Getter permission
     * @return {Permissions}
     */
    public get permission(): Permissions {
        return this._permission;
    }

    /**
     * Setter permission
     * @param {Permissions} value
     */
    public set permission(value: Permissions) {
        this._permission = value;
    }


}
