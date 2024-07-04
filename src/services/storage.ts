export class StorageService {
  private storageKey: string = 'pokemon_search';

  public setStorage(searchValue: string): void {
    localStorage.setItem(this.storageKey, JSON.stringify(searchValue));
  }

  public getStorage(): string | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  public removeStorage(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const storage = new StorageService();
