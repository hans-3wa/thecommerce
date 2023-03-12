import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getPublicProducts, getPublicProductSLug} from "../../../helper/backend_helper";

export const fetchProducts = createAsyncThunk(
    'products/get',
    async () => {
        return await getPublicProducts()
    }
)
export const fetchProductSlug = createAsyncThunk(
    'productSlug/get',
    async (slug) => {
        return await getPublicProductSLug(slug)
    },
)
const initialState = {
    count: 0,
    visible: 0,
    productsAdmin: [],
    productsVisible: [],
    productSlug: {},
    error: null
}
export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        addProductView: (state, action) => {
            return {
                ...state,
                productSlug: {...state.productsVisible.filter(e => e.slug === action.payload)[0]}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return {
                ...state,
                count: action.payload.count,
                productsVisible: action.payload.products
            }
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            return {
                ...state,
                error: {message: "an error occured", status: 500}
            }
        })
        builder.addCase(fetchProductSlug.fulfilled, (state, action) => {
            return {
                ...state,
                productSlug: action.payload.product
            }
        })
        builder.addCase(fetchProductSlug.rejected, (state, action) => {
            return {
                ...state,
                error: {message: "an error occured", status: 500}
            }
        })
    },
})

export const {addProductView} = productSlice.actions

export default productSlice.reducer