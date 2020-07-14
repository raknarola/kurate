import { serializeAs, deserializeAs } from 'cerialize';
import { Organization } from './Organization';

export class Company {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('companyName')
    @deserializeAs('companyName')
    private _companyName: string;

    @serializeAs('companyLogo')
    @deserializeAs('companyLogo')
    private _companyLogo: string;

    @serializeAs('onBordingDate')
    @deserializeAs('onBordingDate')
    private _onBordingDate: string;

    @serializeAs('companyAddress')
    @deserializeAs('companyAddress')
    private _companyAddress: string;

    @serializeAs('modifiedDate')
    @deserializeAs('modifiedDate')
    private _modifiedDate: string;

    @serializeAs('fullName1')
    @deserializeAs('fullName1')
    private _fullName1: string;

    @serializeAs('designation1')
    @deserializeAs('designation1')
    private _designation1: string;

    @serializeAs('email1')
    @deserializeAs('email1')
    private _email1: string;

    @serializeAs('mobile1')
    @deserializeAs('mobile1')
    private _mobile1: string;

    @serializeAs('telephone1')
    @deserializeAs('telephone1')
    private _telephone1: string;

    @serializeAs('fullname2')
    @deserializeAs('fullname2')
    private _fullname2: string;

    @serializeAs('designation2')
    @deserializeAs('designation2')
    private _designation2: string;

    @serializeAs('email2')
    @deserializeAs('email2')
    private _email2: string;

    @serializeAs('mobile2')
    @deserializeAs('mobile2')
    private _mobile2: string;

    @serializeAs('telephone2')
    @deserializeAs('telephone2')
    private _telephone2: string;

    @serializeAs('organization_id')
    @deserializeAs('organization_id')
    private _organization_id: number;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: string;

    @serializeAs('activationData')
    @deserializeAs('activationData')
    private _activationData: string;

    @serializeAs('suspendedDate')
    @deserializeAs('suspendedDate')
    private _suspendedDate: string;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    @serializeAs('organization')
    @deserializeAs('organization')
    private _organization: Organization;


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
     * Getter companyName
     * @return {string}
     */
    public get companyName(): string {
        return this._companyName;
    }

    /**
     * Getter companyLogo
     * @return {string}
     */
    public get companyLogo(): string {
        return this._companyLogo;
    }

    /**
     * Getter onBordingDate
     * @return {string}
     */
    public get onBordingDate(): string {
        return this._onBordingDate;
    }

    /**
     * Getter companyAddress
     * @return {string}
     */
    public get companyAddress(): string {
        return this._companyAddress;
    }

    /**
     * Getter modifiedDate
     * @return {string}
     */
    public get modifiedDate(): string {
        return this._modifiedDate;
    }

    /**
     * Getter fullName1
     * @return {string}
     */
    public get fullName1(): string {
        return this._fullName1;
    }

    /**
     * Getter designation1
     * @return {string}
     */
    public get designation1(): string {
        return this._designation1;
    }

    /**
     * Getter email1
     * @return {string}
     */
    public get email1(): string {
        return this._email1;
    }

    /**
     * Getter mobile1
     * @return {string}
     */
    public get mobile1(): string {
        return this._mobile1;
    }

    /**
     * Getter telephone1
     * @return {string}
     */
    public get telephone1(): string {
        return this._telephone1;
    }

    /**
     * Getter fullname2
     * @return {string}
     */
    public get fullname2(): string {
        return this._fullname2;
    }

    /**
     * Getter designation2
     * @return {string}
     */
    public get designation2(): string {
        return this._designation2;
    }

    /**
     * Getter email2
     * @return {string}
     */
    public get email2(): string {
        return this._email2;
    }

    /**
     * Getter mobile2
     * @return {string}
     */
    public get mobile2(): string {
        return this._mobile2;
    }

    /**
     * Getter telephone2
     * @return {string}
     */
    public get telephone2(): string {
        return this._telephone2;
    }

    /**
     * Getter organization_id
     * @return {number}
     */
    public get organization_id(): number {
        return this._organization_id;
    }

    /**
     * Getter status
     * @return {string}
     */
    public get status(): string {
        return this._status;
    }

    /**
     * Getter activationData
     * @return {string}
     */
    public get activationData(): string {
        return this._activationData;
    }

    /**
     * Getter suspendedDate
     * @return {string}
     */
    public get suspendedDate(): string {
        return this._suspendedDate;
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
     * Getter organization
     * @return {Organization}
     */
    public get organization(): Organization {
        return this._organization;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter companyName
     * @param {string} value
     */
    public set companyName(value: string) {
        this._companyName = value;
    }

    /**
     * Setter companyLogo
     * @param {string} value
     */
    public set companyLogo(value: string) {
        this._companyLogo = value;
    }

    /**
     * Setter onBordingDate
     * @param {string} value
     */
    public set onBordingDate(value: string) {
        this._onBordingDate = value;
    }

    /**
     * Setter companyAddress
     * @param {string} value
     */
    public set companyAddress(value: string) {
        this._companyAddress = value;
    }

    /**
     * Setter modifiedDate
     * @param {string} value
     */
    public set modifiedDate(value: string) {
        this._modifiedDate = value;
    }

    /**
     * Setter fullName1
     * @param {string} value
     */
    public set fullName1(value: string) {
        this._fullName1 = value;
    }

    /**
     * Setter designation1
     * @param {string} value
     */
    public set designation1(value: string) {
        this._designation1 = value;
    }

    /**
     * Setter email1
     * @param {string} value
     */
    public set email1(value: string) {
        this._email1 = value;
    }

    /**
     * Setter mobile1
     * @param {string} value
     */
    public set mobile1(value: string) {
        this._mobile1 = value;
    }

    /**
     * Setter telephone1
     * @param {string} value
     */
    public set telephone1(value: string) {
        this._telephone1 = value;
    }

    /**
     * Setter fullname2
     * @param {string} value
     */
    public set fullname2(value: string) {
        this._fullname2 = value;
    }

    /**
     * Setter designation2
     * @param {string} value
     */
    public set designation2(value: string) {
        this._designation2 = value;
    }

    /**
     * Setter email2
     * @param {string} value
     */
    public set email2(value: string) {
        this._email2 = value;
    }

    /**
     * Setter mobile2
     * @param {string} value
     */
    public set mobile2(value: string) {
        this._mobile2 = value;
    }

    /**
     * Setter telephone2
     * @param {string} value
     */
    public set telephone2(value: string) {
        this._telephone2 = value;
    }

    /**
     * Setter organization_id
     * @param {number} value
     */
    public set organization_id(value: number) {
        this._organization_id = value;
    }

    /**
     * Setter status
     * @param {string} value
     */
    public set status(value: string) {
        this._status = value;
    }

    /**
     * Setter activationData
     * @param {string} value
     */
    public set activationData(value: string) {
        this._activationData = value;
    }

    /**
     * Setter suspendedDate
     * @param {string} value
     */
    public set suspendedDate(value: string) {
        this._suspendedDate = value;
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
     * Setter organization
     * @param {Organization} value
     */
    public set organization(value: Organization) {
        this._organization = value;
    }
}
