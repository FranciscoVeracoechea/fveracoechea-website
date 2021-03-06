import { BehaviorSubject } from 'rxjs';

export type MainInfo = {
  title: string,
  subtitle: string,
  background_image: string
}

export const initialState: MainInfo = {
  title: 'Francisco Veracoechea',
  subtitle: 'Web Developer',
  background_image: '',
}

export const main$ = new BehaviorSubject<MainInfo>(initialState);
