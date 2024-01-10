export interface PickerCardProps {
  heading: string;
  description: string;
  openClick: (picker: string) => void;
  knowClick: () => void;
  borderColor: string;
}

export interface SingleColorProps {
  color: string;
  colorValue: any;
  id: string;
  deleteColor: (id: string) => void;
}

export interface IPGeolocationResponse {
  ip: string;
  isp: string;
  org: string;
  hostname: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  city: string;
  country_code: string;
  country_name: string;
  continent_code: string;
  continent_name: string;
  region: string;
  district: string;
  timezone_name: string;
  connection_type: string;
  asn_number: number;
  asn_org: string;
  asn: string;
  currency_code: string;
  currency_name: string;
  success: boolean;
  premium: boolean;
}

export type ResponseKeyValueArray = [string, any][];

export interface SimpleIntroProps {
  tag?: string;
  heading: string;
  subtitle: string;
  btntext: string;
}

export interface Root {
  message: string;
  title: string;
  images: Image[];
}

export interface Image {
  alt?: string;
  url?: string;
  src: string;
}
