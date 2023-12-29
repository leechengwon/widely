const allJsonData = (async () => {
  const response = await fetch(`/widely/data/product/all.json`);
  const data = await response.json();
  return data;
})();

const basketList = [];

/**
 * category: all, food, new, nutrients, shaving, skin
 * sort : latest, lowprice, highprice
 */
export const getProductList = async (category, sort, currentPage, size) => {
  return await fetch(
    `http://10.58.52.82:8000/widely/products?category=${category}&sort=${sort}&page=${currentPage}&size=${size}`,
  );
};

export const _getProductList = async (category, sort, currentPage, size) => {
  const response = await fetch(`/widely/data/product/${category}.json`);
  const data = await response.json();
  let { list } = data;

  if (sort === 'lowprice') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'highprice') {
    list.sort((a, b) => b.price - a.price);
  } else {
    // latest - mock data have no date field.
    // so do nothing when using mock data.
  }
  const firstIndex = (currentPage - 1) * size;
  list = list.slice(firstIndex, firstIndex + size);
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        category: data.category,
        total: data.total,
        list,
      },
    });
  });
};

export const getDetail = async (id) => {
  return await fetch(`http://10.58.52.82:8000/widely/products/${id}`);
};

export const _getDetail = async (id) => {
  const data = await allJsonData;
  const { list } = data;
  const detail = list.filter((item) => item.id === Number(id));
  return new Promise((resolve, reject) => {
    resolve({
      data: detail[0],
    });
  });
};

export const searchProduct = async (keyword) => {
  return await fetch(
    `http://10.58.52.82:8000/widely/search?keyword=${keyword}`,
  );
};
export const _searchProduct = async (keyword) => {
  const data = await allJsonData;
  const { list } = data;
  const result = list.filter((item) => item.name.includes(keyword));
  return new Promise((resolve, reject) => {
    resolve({
      data: result,
    });
  });
};

export const getMain = async () => {
  return await fetch('http://10.58.52.82:8000/widely/products/main');
};

export const _getMain = async () => {
  const result = {
    nutrient: {},
    shaving: {},
    skin: {},
    food: {},
  };
  for (let category of ['nutrient', 'shaving', 'skin', 'food']) {
    const response = await fetch(`/widely/data/product/${category}.json`);
    const data = await response.json();

    result[category] = data.list.slice(0, 4);
  }
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        result1: result.nutrient,
        result2: result.shaving,
        result3: result.skin,
        result4: result.food,
      },
    });
  });
};

export const getBasketList = async (token) => {
  return await fetch('http://10.58.52.82:8000/widely/carts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
  });
};

export const _getBasketList = async () => {
  let list = basketList;
  return new Promise((resolve, reject) => {
    resolve({
      data: list,
    });
  });
};

export const addBasket = async (token, productId, count) => {
  return await fetch('http://10.58.52.82:8000/widely/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    body: JSON.stringify({
      productId: productId,
      productQty: count,
    }),
  });
};

export const _addBasket = async (token, productId, count) => {
  const data = await allJsonData;
  const { list } = data;
  const addedItem = list.filter((item) => item.id === Number(productId))[0];
  addedItem.count = count;
  addedItem.image = addedItem.thumbnailImage;
  addedItem.product_name = addedItem.name;
  basketList.push(addedItem);
  return new Promise((resolve, reject) => {
    resolve({
      message: 'Insert success',
    });
  });
};

export const _deleteBasket = async (token, productId) => {
  const itemIndex = basketList.findIndex(
    (item) => item.productId === Number(productId),
  );
  basketList.splice(itemIndex, 1);
  return new Promise((resolve, reject) => {
    resolve({
      message: 'Delete success',
    });
  });
};

export const login = async (email, password) => {
  return await fetch('http://10.58.52.82:8000/widely/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const _login = async (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({
      message: 'Login success',
      token: 'this-is-token',
    });
  });
};
