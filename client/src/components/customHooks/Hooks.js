import { useState, useEffect } from 'react';
import { getAllShopAPI, getAllShopProductsAPI } from '../../Services/allAPI';


export const useFetchShopProducts = (shopId) => {
    const [allProduct, setAllProduct] = useState([]);
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const result = await getAllShopProductsAPI(shopId);
          if (result.status === 200) {
            setAllProduct(result.data);
          } else {
            console.error('Error fetching product details');
          }
        } catch (error) {
          console.error('Error in API call:', error);
        }
      };
  
      fetchProductDetails();
    }, [shopId]);
  
    return allProduct;
  };

export const useFetchShops = (searchKey) => {
const [shops, setShops] = useState([]);

useEffect(() => {
    const getShopsData = async () => {
    try {
        const result = await getAllShopAPI(searchKey);
        if (result.status === 200) {
        setShops(result.data);
        } else {
        console.error('Error fetching shops data:', result);
        }
    } catch (error) {
        console.error('API call failed:', error);
    }
    };

    getShopsData();
}, [searchKey]);

return shops;
};