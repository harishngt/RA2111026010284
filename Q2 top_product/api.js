const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/companies/:companyname/categories/:categoryname/products', async (req, res) => {
  try {
    const { companyname, categoryname } = req.params;
    const { top, page, sort } = req.query;


    if (!companyname || !categoryname) {
      return res.status(400).json({ error: 'Company name and category name are required.' });
    }

    let queryParams = {
      top,
      page,
      sort
    };

    Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);


    const products = await getTopProducts(companyname, categoryname, queryParams);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products.' });
  }
});

app.get('/companies/:companyname/categories/:categoryname/products/:productid', async (req, res) => {
  try {
    const { companyname, categoryname, productid } = req.params;


    const product = await getProductDetails(companyname, categoryname, productid);

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
});


async function getTopProducts(companyname, categoryname, queryParams) {
  const response = await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`, { params: queryParams });
  return response.data;
}

async function getProductDetails(companyname, categoryname, productid) {
  const response = await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products/${productid}`);
  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
