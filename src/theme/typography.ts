import {Platform} from 'react-native';

const fontFamily = Platform.select({
  ios: 'PingFang SC',
  android: undefined,
  default: undefined,
});

export const typography = {
  h1: {fontSize: 28, fontWeight: '700' as const, lineHeight: 36, fontFamily},
  h2: {fontSize: 22, fontWeight: '600' as const, lineHeight: 30, fontFamily},
  h3: {fontSize: 18, fontWeight: '600' as const, lineHeight: 26, fontFamily},
  body: {fontSize: 15, fontWeight: '400' as const, lineHeight: 22, fontFamily},
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
    fontFamily,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    fontFamily,
  },
  captionBold: {
    fontSize: 13,
    fontWeight: '600' as const,
    lineHeight: 18,
    fontFamily,
  },
  small: {fontSize: 11, fontWeight: '400' as const, lineHeight: 16, fontFamily},
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    fontFamily,
  },
};
