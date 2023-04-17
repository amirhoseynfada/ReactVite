import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const categoryData = ["laptops", "smartphones", "fragrances", "skincare"];

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterProdut, setFilterProduc] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const getFetchApi = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setAllProducts(data?.products);
  };

  useEffect(() => {
    getFetchApi();
  }, []);

  const filteredData = (products) => {
    const qsCategory = location.search;
    const fProduct = products?.filter(
      (a) => a.category === qsCategory.replace("?", "")
    );
    return fProduct;
  };

  useEffect(() => {
    if (location.search) {
      setFilterProduc(filteredData(allProducts));
    } else {
      setFilterProduc(allProducts);
    }
  }, [location.search, allProducts]);

  const selectCategory = (categoty) => {
    const qsl = "?";
    navigate(location.pathname + location.search ? qsl + categoty : "");
  };

  return (
    <div className="container my-4">
      <div className="alert alert-success">
        <h3>Categories : </h3>
        {location.search && (
          <button onClick={() => navigate(location.pathname)}>
            closeFillter
          </button>
        )}
        <div className="mt-4">
          {categoryData?.map((cat, indx) => (
            <button
            onClick={() => selectCategory(cat)}
              key={indx}
              className="mx-2"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {allProducts?.length == 0 && <p>Loading....</p>}
      {allProducts?.length !== 0 &&
        filterProdut?.map((item) => {
          return (
            <div
              className="card d-flex flex-column align-items-center pt-3 mb-4"
              key={item?.id}
            >
              <div className="card-body text-center">
                <img
                  src={item?.images[0]}
                  style={{ width: "100px" }}
                  className="rounded"
                  alt=""
                />
                <h5 className="mt-2">{item.title}</h5>
                <span>{item?.price} $</span>
              </div>
              <div className="card-footer w-100">
                <p>{item?.description}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
