import React, { useState } from 'react'
import loadingImage from '../../assets/loading.webp';
import defaultShopImage from '../../assets/user.webp';
import imagenotfound from '../../assets/imagenotfound.webp';
function ShopImage({ shop, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageSrc = shop.profileimage
      ? `${shop.profileimage}`
      : defaultShopImage;
  return (
    <>
    <img
      src={isLoaded ? imageSrc : loadingImage}
      
      alt={`Shop profile image of ${shop.shopname}`}
      onClick={onClick}
      onError={(e) => (e.target.src = imagenotfound)} // Fallback to error image
      className="rounded-circle mb-3 shadow border border-1"
      style={{ width: '200px', height: '200px' }}
      onLoad={() => setIsLoaded(true)} // Switch from loading to actual image on load
      
      />
      </>
  )
}

export default ShopImage

