interface ISaveData {
  func: SaveDataFunction;
  key: string;
}

type SaveDataFunction = () => unknown;
type RestoreDataFunction = (value: string) => void;

export class Refresh {
  private saveData: ISaveData[] = [];

  constructor() {
    this.beforeUnload();
  }

  public addSaveData(savedataObj: ISaveData): void {
    this.saveData.push(savedataObj);
  }

  public restoreData(key: string, func: RestoreDataFunction): void {
    const value = localStorage.getItem(key);
    if (value) {
      func(value);
    }
  }

  private beforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.saveData.forEach((item) => localStorage.setItem(item.key, String(item.func())));
    });
  }
}
