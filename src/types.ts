export type CanvasColor = 'black' | 'white';

export interface HandprintConfig {
  canvasColor: CanvasColor;
  setOption: 1 | 2; // 1 = 1 холст 20*30 см (890 сом), 2 = 2 холста 20*30 см (1190 сом)
  leftHandColor: string; // Hex color code
  leftHandName: string; // Color name
  rightHandColor: string;
  rightHandName: string;
  heartColor: 'red' | 'gold' | 'none';
  customDate: string; // e.g. "18.04" or a year/word
  withGlitter: boolean; // +70 сом
}

export type PbnPhotoSize = '30x40' | '40x50' | '50x70';

export interface CustomPbnConfig {
  imageSrc: string | null;
  processedSrc: string | null;
  size: PbnPhotoSize;
  colorsCount: number; // 26 to 52 colors
  prepaymentPaid: boolean;
}

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface OrderCart {
  handprintKits: HandprintConfig[];
  customPbnKits: CustomPbnConfig[];
  catalogPbnCount: number;
  catalogPbnOffer: 'none' | 'two_plus_one' | 'discount_15'; // 2+1 third as gift OR 15% discount
}
