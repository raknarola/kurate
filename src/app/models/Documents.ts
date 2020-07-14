import { serializeAs, deserializeAs } from 'cerialize';
export class Documents {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('fileName')
    @deserializeAs('fileName')
    private _fileName: string;

    @serializeAs('documentName')
    @deserializeAs('documentName')
    private _documentName: string;

    @serializeAs('documentUrl')
    @deserializeAs('documentUrl')
    private _documentUrl: string;

    @serializeAs('documentType')
    @deserializeAs('documentType')
    private _documentType: string;

    @serializeAs('fileSize')
    @deserializeAs('fileSize')
    private _fileSize: number;

    @serializeAs('progress')
    @deserializeAs('progress')
    private _progress: number;

    @serializeAs('file')
    @deserializeAs('file')
    private _file: File;

    @deserializeAs('imageUrl')
    private _imageUrl: string;


    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter fileName
     * @return {string}
     */
    public get fileName(): string {
        return this._fileName;
    }

    /**
     * Getter documentName
     * @return {string}
     */
    public get documentName(): string {
        return this._documentName;
    }

    /**
     * Getter documentUrl
     * @return {string}
     */
    public get documentUrl(): string {
        return this._documentUrl;
    }


    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter fileName
     * @param {string} value
     */
    public set fileName(value: string) {
        this._fileName = value;
    }

    /**
     * Setter documentName
     * @param {string} value
     */
    public set documentName(value: string) {
        this._documentName = value;
    }

    /**
     * Setter documentUrl
     * @param {string} value
     */
    public set documentUrl(value: string) {
        this._documentUrl = value;
    }


    /**
     * Getter documentType
     * @return {string}
     */
    public get documentType(): string {
        return this._documentType;
    }

    /**
     * Setter documentType
     * @param {string} value
     */
    public set documentType(value: string) {
        this._documentType = value;
    }

    /**
     * Getter file
     * @return {File}
     */
    public get file(): File {
        return this._file;
    }

    /**
     * Setter file
     * @param {File} value
     */
    public set file(value: File) {
        this._file = value;
    }

    /**
     * Getter imageUrl
     * @return {string}
     */
    public get imageUrl(): string {
        return this._imageUrl;
    }

    /**
     * Setter imageUrl
     * @param {string} value
     */
    public set imageUrl(value: string) {
        this._imageUrl = value;
    }



    /**
     * Getter fileSize
     * @return {number}
     */
    public get fileSize(): number {
        return this._fileSize;
    }

    /**
     * Setter fileSize
     * @param {number} value
     */
    public set fileSize(value: number) {
        this._fileSize = value;
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

}

