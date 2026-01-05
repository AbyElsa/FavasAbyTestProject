import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const scale = Platform?.OS === 'ios' ? width / 370 : width / 350

export function normalize(size: any) {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}