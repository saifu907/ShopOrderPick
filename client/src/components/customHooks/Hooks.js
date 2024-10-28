import { useState, useEffect } from 'react';
import { getAllShopAPI, getAllShopProductsAPI, getAproductAPI } from '../../Services/allAPI';


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

export const useFetchProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchProductDetails = async () => {
          try {
            
              const result = await getAproductAPI(productId);
              if (result.status === 200) {
                  const products = result.data;
                  setAllProducts(products);
                  const oneProduct = products.find((prod) => prod._id === productId);
                  setProduct(oneProduct);
              } else {
                  setError('Error fetching product details');
              }
          } catch (err) {
              setError('API call failed: ' + err.message);
          } 
      };

      fetchProductDetails();
  }, [productId]);

  return { product, allProducts, error };
};