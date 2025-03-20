
import { Mix } from './components/question/types';

declare global {
  interface Window {
    mixesData: Mix[];
  }
}
