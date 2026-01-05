import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';

const { width, height } = Dimensions.get('window');

const PreviewScreen = ({ route }: any) => {
    const { previewDetails } = route.params;
    const [imagesArray, setImagesArray] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatListRef = useRef<FlatList>(null);
    const zoomRefs = useRef<Record<number, any | null>>({});

    const isLandscape = width > height;
    const isNextDisabled = currentIndex === imagesArray.length - 1;
    const isPrevDisabled = currentIndex === 0;

    const listKey = useMemo(
        () => imagesArray.map((item, i) => item?.id ?? i).join('-'),
        [imagesArray]
    );

    useFocusEffect(
        useCallback(() => {
            if (!previewDetails) {
                setImagesArray([]);
                return;
            }
            try {
                setImagesArray(JSON.parse(previewDetails));
                setCurrentIndex(0);
            } catch {
                setImagesArray([]);
            }
        }, [previewDetails])
    );

    const resetZoom = () => {
        zoomRefs.current[currentIndex]?.reset?.();
    };

    const goNext = () => {
        if (!isNextDisabled) {
            resetZoom();
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true
            });
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goPrev = () => {
        if (!isPrevDisabled) {
            resetZoom();
            flatListRef.current?.scrollToIndex({
                index: currentIndex - 1,
                animated: true
            });
            setCurrentIndex(prev => prev - 1);
        }
    };

    const NavButton = ({ icon, onPress, disabled }: any) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.navButton,
                { backgroundColor: disabled ? '#999' : '#2e3a4b' }
            ]}
        >
            <Ionicons name={icon} size={28} color="#fff" />
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#D0E4FF', '#ffffff', '#ffffff']} style={styles.container}>
            <FlatList
                ref={flatListRef}
                key={listKey}
                data={imagesArray}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, idx) =>
                    item?.id ? item.id.toString() : idx.toString()
                }
                onMomentumScrollEnd={e => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(index);
                }}
                renderItem={({ item, index }) => (
                    <ImageZoom
                        ref={ref => (zoomRefs.current[index] = ref)}
                        cropWidth={width}
                        cropHeight={height}
                        imageWidth={width}
                        imageHeight={height}
                        minScale={1}
                        maxScale={3}
                        enableDoubleClickZoom
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                        />
                    </ImageZoom>
                )}
            />

            {imagesArray.length > 1 && (
                isLandscape ? (
                    <View style={styles.landscapeNav}>
                        <NavButton
                            icon="chevron-back"
                            onPress={goPrev}
                            disabled={isPrevDisabled}
                        />
                        <NavButton
                            icon="chevron-forward"
                            onPress={goNext}
                            disabled={isNextDisabled}
                        />
                    </View>
                ) : (
                    <View style={styles.portraitNav}>
                        <NavButton
                            icon="chevron-back"
                            onPress={goPrev}
                            disabled={isPrevDisabled}
                        />
                        <NavButton
                            icon="chevron-forward"
                            onPress={goNext}
                            disabled={isNextDisabled}
                        />
                    </View>
                )
            )}
        </LinearGradient>
    );
};

export default PreviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width,
        height,
        resizeMode: 'contain'
    },
    navButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    landscapeNav: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    portraitNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});
