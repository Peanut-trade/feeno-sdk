export class FeeNo {
  private static instance: FeeNo;

  private _storage: string = '';

  private constructor() {}

  public static getInstance(): FeeNo {
    if (!FeeNo.instance) {
      FeeNo.instance = new FeeNo();
    }

    return FeeNo.instance;
  }

  public setStorage(storage: string) {
    this._storage = storage;
  }

  public getStorage(): string {
    return this._storage;
  }
}
