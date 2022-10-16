import {useTheme} from '@react-navigation/native';
import { IMyTheme } from '../../../../styles/main.styles';

export default function useAppTheme() {
  const nativeTheme = useTheme();
  return nativeTheme as IMyTheme;
}
