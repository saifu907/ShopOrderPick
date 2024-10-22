import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Inpage/SearchBar';
import { useFetchShops } from './customHooks/Hooks';
import ShopImage from './Inpage/ShopImage';

function Shops() {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const shops = useFetchShops(searchKey);

  const handleImgClick = (id) => {
    navigate(`/shop/${id}`);
  };

  return (
    <div className="my-3">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
        <h1 className="pe-3 mb-3 mb-md-0">All Shops</h1>
        <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
      </div>
      <div className="row">
        {shops.map((shop, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow-none h-100">
              <div className="card-body text-center">
                <ShopImage
                  shop={shop}
                  onClick={() => handleImgClick(shop._id)}
                />
                <h5 className="card-title">{shop.shopname}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Shops;
