import {
  FETCH_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
  FETCH_CATEGORY,
  FETCH_CATEGORYLIST,
  FETCH_PRODUCTBYNAME,
  FETCH_PRODUCTSBYID,
  FETCH_PRODUCTFILTER,
  SET_STATUS,
} from "../actions/productAction";

const initialState = {
  products: [],
  categories: [],
  categorieslist: [],
  productsbyname: [],
  productsbyID: [],
  productFilter: {
    data: [],
    pageIndex: 0,
    totalPage: 0,
    totalRecord: 0,
    totalRecordAll: 0,
  },
  isFirstOpen: false,
  isLoading: false,
  isLoadingSearch: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_PRODUCTS:
      console.log(action);
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case SET_STATUS:
      const updatedProducts = state.products.map((product) => {
        if (product._id === action.id) {
          return { ...product, inCart: action.status };
        }
        return product;
      });
      console.log(updatedProducts);
      return {
        ...state,
        products: [...updatedProducts],
        isLoading: false,
      };

    default:
      return state;
  }
};
