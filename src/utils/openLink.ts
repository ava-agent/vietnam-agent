import {Linking, Platform} from 'react-native';

export async function openAppStore(
  iosUrl: string,
  androidUrl: string,
): Promise<void> {
  const url = Platform.select({ios: iosUrl, android: androidUrl}) ?? iosUrl;
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  } catch (e) {
    console.warn('Failed to open URL:', url, e);
  }
}
