import { serializeAs } from 'cerialize';

export class FileUploadArrayWithKey {

    @serializeAs('key')
    private _key: string;

    @serializeAs('file')
    private _file: File;



    /**
     * Getter key
     * @return {string}
     */
    public get key(): string {
        return this._key;
    }

    /**
     * Getter file
     * @return {File}
     */
    public get file(): File {
        return this._file;
    }

    /**
     * Setter key
     * @param {string} value
     */
    public set key(value: string) {
        this._key = value;
    }

    /**
     * Setter file
     * @param {File} value
     */
    public set file(value: File) {
        this._file = value;
    }

}
