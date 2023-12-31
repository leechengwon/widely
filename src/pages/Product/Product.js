import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Goods from '../../components/Goods/Goods';
import './Product.scss';
import Pagination from '../../components/Pagination/Pagination';

import { _getProductList } from '../../api';

const size = 6;
const pageLimit = 5;

const Product = () => {
  const [data, setData] = useState({});
  const [sort, setSort] = useState(sortingList[0].value);

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const changeSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sort, currentPage]);
  useEffect(() => {
    //  fetch(
    //   `http://10.58.52.82:8000/products?category=${category}&sort=${sort}&page=${currentPage}&size=${size}`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    _getProductList(category, sort, currentPage, size).then((result) => {
      const totalPage = Math.ceil(result.data.total / size);
      setTotalPage(totalPage);
      setData(result.data);
    });
  }, [searchParams, sort, currentPage, category]);
  if (!Object.keys(data).length > 0) return null;

  return (
    <div className="product">
      <div className="goodsContainer">
        <h1>{data.category}</h1>
        <div className="total">
          <p>{`총 ${data.total} 개`}</p>

          <select className="select" onChange={changeSort}>
            {sortingList.map((list) => {
              return (
                <option key={list.id} value={list.value}>
                  {list.name}
                </option>
              );
            })}
          </select>
        </div>
        <Goods datalist={data.list} />
      </div>
      <Pagination
        pageLimit={pageLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default Product;

const sortingList = [
  {
    id: 0,
    name: '신상품순',
    value: 'latest',
  },
  {
    id: 1,
    name: '낮은가격순',
    value: 'lowprice',
  },
  {
    id: 2,
    name: '높은가격순',
    value: 'highprice',
  },
];
