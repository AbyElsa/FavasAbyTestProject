import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

const initialState = {
    isLoading: false,
    productData: [],
    allProductDetails: {}
};

const reducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "ISLOADING_CHANGED":
            return { ...state, isLoading: action.payload };
        case "PRODUCTDATA_CHANGED":
            return { ...state, productData: action.payload };
        case "ALLPRODUCTDETAILS_CHANGED":
            return { ...state, allProductDetails: action.payload };
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["productData", "allProductDetails"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

const isLoadingChanged = (isLoading: boolean) => ({
    type: "ISLOADING_CHANGED",
    payload: isLoading,
});

const productDataChanged = (productData: any[]) => ({
    type: "PRODUCTDATA_CHANGED",
    payload: productData,
});

const allProductDetailsChanged = (allProductDetails: any) => ({
    type: "ALLPRODUCTDETAILS_CHANGED",
    payload: allProductDetails,
});

export { allProductDetailsChanged, isLoadingChanged, productDataChanged };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
