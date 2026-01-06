import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { allProductDetailsChanged, isLoadingChanged, productDataChanged } from '@utils/store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { normalize } from '@utils/normaliseFont';
import { getDetailsBySummaryIds, getSummaries } from '../../../services/appServices';


type ClickOrder = Record<string, number>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomePage = ({ navigation }: any) => {

  const dispatch = useDispatch();
  const { productData, allProductDetails, isLoading }: any = useSelector(state => state);
  const [clickOrder, setClickOrder] = useState<ClickOrder>({});

  useEffect(() => {
    if (productData.length === 0) getProducts();
  }, []);

  const getProducts = async () => {
    try {
      dispatch(isLoadingChanged(true));
      dispatch(productDataChanged([]));
      dispatch(allProductDetailsChanged([]));
      setClickOrder({});
      const res = await getSummaries();
      const sortedData = Array.isArray(res?.data)
        ? [...res.data].sort(
          (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
        )
        : [];
      dispatch(productDataChanged(sortedData));
      getDataForEachProduct();
    } catch (error) {
      dispatch(isLoadingChanged(false));
    }
  };

  const getDataForEachProduct = async () => {
    try {
      const selectedIds = productData?.map((item: any) => item.id);
      const details = await getDetailsBySummaryIds(selectedIds);
      dispatch(allProductDetailsChanged(details?.data));
      dispatch(isLoadingChanged(false));
    } catch (error) {
      dispatch(isLoadingChanged(false));
    }
  };

  const handleTileClick = (id: string | number) => {
    const key = id.toString();
    setClickOrder((prev) => {
      if (prev[key] !== undefined) {
        const removedOrder = prev[key];
        const newOrder: ClickOrder = {};
        Object.entries(prev).forEach(([k, order]) => {
          if (k === key) return;
          newOrder[k] = order > removedOrder ? order - 1 : order;
        });
        return newOrder;
      }
      return {
        ...prev,
        [key]: Object.keys(prev).length + 1,
      };
    });
  };

  const handlePreview = () => {
    try {
      dispatch(isLoadingChanged(true));
      const previewIds = Object.entries(clickOrder).sort((a, b) => a[1] - b[1]).map(([id]) => id);
      const previewDetails = previewIds.flatMap((id) => {
        const items = allProductDetails?.filter(
          (detail: any) => detail.summaryId?.toString() === id
        );
        return items.sort((a: any, b: any) => a.displayOrder - b.displayOrder);
      });
      navigation.navigate('Preview', { previewDetails: JSON.stringify(previewDetails) });
      dispatch(isLoadingChanged(false));
    } catch (error) {
      console.log('Error in preview', error);
      dispatch(isLoadingChanged(false));
    }
  };

  return (
    <LinearGradient colors={['#D0E4FF', '#ffffff', '#ffffff']} style={styles.container}>
      {
        isLoading ?
          <View style={styles.fullScreen}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          </View>
          :
          <>
            <TouchableOpacity style={styles.refreshButton} onPress={getProducts}>
              <Ionicons name="refresh-sharp" size={30} color="#fff" style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            {/* <Text style={styles.title}>PHORVIA Products</Text>
            <Text style={styles.subtitle}>Our Healthcare<Text style={styles.subtitleHighlight}> Products</Text>
            </Text> */}
            <Image 
              source={require('../../../assets/homeBanner.png')} 
              style={{ 
                width: screenWidth * 0.7, 
                height: screenHeight * 0.1
              }} 
              resizeMode="contain"
            />
            <FlatList
              data={productData}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              renderItem={({ item }) => {
                const order = clickOrder[item.id.toString()];
                return (
                  <TouchableOpacity style={styles.tile} onPress={() => handleTileClick(item.id)} >
                    {order !== undefined && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{order}</Text>
                      </View>
                    )}
                    <Image source={{ uri: item.logoUrl }} style={styles.productImage} />
                  </TouchableOpacity>
                );
              }}
            />
            {Object.keys(clickOrder).length > 0 && (
              <View style={{ width: '49%', paddingVertical: 10, flexDirection: 'row', gap: 15, alignSelf: 'flex-end' }}>
                <TouchableOpacity style={styles.clearButton} onPress={() => setClickOrder({})}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
                  <Text style={styles.previewButtonText}>Preview</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
      }
    </LinearGradient>
  );
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    gap: 10,
  },
  refreshButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#18a2d2',
    padding: 12,
    borderRadius: 30,
    zIndex: 1,
  },
  title: {
    fontSize: normalize(12),
    color: '#83868c',
    fontFamily: 'medium',
  },
  subtitle: {
    fontSize: normalize(12),
    color: '#2e3a4b',
    fontFamily: 'medium',
  },
  subtitleHighlight: {
    color: '#18a2d2',
  },
  flatList: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  flatListContent: {
    gap: 15,
    paddingBottom: 50,
  },
  tile: {
    flex: 1,
    borderColor: '#18a2d2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#18a2d2',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productImage: {
    height: 80,
    width: 120,
    resizeMode: 'contain',
  },
  previewButton: {
    flex: 1,
    backgroundColor: '#18a2d2',
    borderRadius: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  previewButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'medium',
    fontSize: 16,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#18a2d2',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#18a2d2',
    textAlign: 'center',
    fontFamily: 'medium',
    fontSize: 16,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
});