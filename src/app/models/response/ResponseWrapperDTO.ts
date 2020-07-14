import { serializeAs, deserializeAs } from 'cerialize';

export class ResponseWrapperDTO {
    @deserializeAs('response')
    private _response: number;

    @deserializeAs('message')
    private _message: any;

    @deserializeAs('result')
    private _result: any;

    @deserializeAs('isResponseOnPage')
    private _isResponseOnPage: boolean;



    /**
     * Getter response
     * @return {number}
     */
    public get response(): number {
        return this._response;
    }

    /**
     * Getter message
     * @return {any}
     */
    public get message(): any {
        return this._message;
    }

    /**
     * Getter result
     * @return {any}
     */
    public get result(): any {
        return this._result;
    }

    /**
     * Getter isResponseOnPage
     * @return {boolean}
     */
    public get isResponseOnPage(): boolean {
        return this._isResponseOnPage;
    }

    /**
     * Setter response
     * @param {number} value
     */
    public set response(value: number) {
        this._response = value;
    }

    /**
     * Setter message
     * @param {any} value
     */
    public set message(value: any) {
        this._message = value;
    }

    /**
     * Setter result
     * @param {any} value
     */
    public set result(value: any) {
        this._result = value;
    }

    /**
     * Setter isResponseOnPage
     * @param {boolean} value
     */
    public set isResponseOnPage(value: boolean) {
        this._isResponseOnPage = value;
    }

}

