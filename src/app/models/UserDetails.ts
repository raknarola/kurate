import { serializeAs, deserializeAs } from 'cerialize';
import { Role } from './Role';
import { Company } from './Company';
export class UserDetails {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;

    @serializeAs('company_id')
    @deserializeAs('company_id')
    private _company_id: number;

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;

    @serializeAs('lastName')
    @deserializeAs('lastName')
    private _lastName: string;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('username')
    @deserializeAs('username')
    private _username: string;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: number;

    @serializeAs('user_id')
    @deserializeAs('user_id')
    private _user_id: number;

    @serializeAs('hash_password')
    @deserializeAs('hash_password')
    private _hash_password: string;

    @serializeAs('role_id')
    @deserializeAs('role_id')
    private _role_id: number;

    @serializeAs('api_token')
    @deserializeAs('api_token')
    private _api_token: string;

    @serializeAs('created_at')
    @deserializeAs('created_at')
    private _created_at: string;

    @serializeAs('updated_at')
    @deserializeAs('updated_at')
    private _updated_at: string;

    @serializeAs('company')
    @deserializeAs('company')
    private _company: Company;

    @serializeAs('role')
    @deserializeAs('role')
    private _role: Role;



    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter company_id
     * @return {number}
     */
    public get company_id(): number {
        return this._company_id;
    }

    /**
     * Getter firstName
     * @return {string}
     */
    public get firstName(): string {
        return this._firstName;
    }

    /**
     * Getter lastName
     * @return {string}
     */
    public get lastName(): string {
        return this._lastName;
    }

    /**
     * Getter email
     * @return {string}
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Getter username
     * @return {string}
     */
    public get username(): string {
        return this._username;
    }

    /**
     * Getter hash_password
     * @return {string}
     */
    public get hash_password(): string {
        return this._hash_password;
    }

    /**
     * Getter role_id
     * @return {number}
     */
    public get role_id(): number {
        return this._role_id;
    }

    /**
     * Getter api_token
     * @return {string}
     */
    public get api_token(): string {
        return this._api_token;
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
     * Getter company
     * @return {Company}
     */
    public get company(): Company {
        return this._company;
    }

    /**
     * Getter role
     * @return {Role}
     */
    public get role(): Role {
        return this._role;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter company_id
     * @param {number} value
     */
    public set company_id(value: number) {
        this._company_id = value;
    }

    /**
     * Setter firstName
     * @param {string} value
     */
    public set firstName(value: string) {
        this._firstName = value;
    }

    /**
     * Setter lastName
     * @param {string} value
     */
    public set lastName(value: string) {
        this._lastName = value;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Setter username
     * @param {string} value
     */
    public set username(value: string) {
        this._username = value;
    }

    /**
     * Setter hash_password
     * @param {string} value
     */
    public set hash_password(value: string) {
        this._hash_password = value;
    }

    /**
     * Setter role_id
     * @param {number} value
     */
    public set role_id(value: number) {
        this._role_id = value;
    }

    /**
     * Setter api_token
     * @param {string} value
     */
    public set api_token(value: string) {
        this._api_token = value;
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
     * Setter company
     * @param {Company} value
     */
    public set company(value: Company) {
        this._company = value;
    }

    /**
     * Setter role
     * @param {Role} value
     */
    public set role(value: Role) {
        this._role = value;
    }

    /**
     * Getter user_id
     * @return {number}
     */
    public get user_id(): number {
        return this._user_id;
    }

    /**
     * Setter user_id
     * @param {number} value
     */
    public set user_id(value: number) {
        this._user_id = value;
    }

    /**
     * Getter status
     * @return {number}
     */
    public get status(): number {
        return this._status;
    }

    /**
     * Setter status
     * @param {number} value
     */
    public set status(value: number) {
        this._status = value;
    }

}
