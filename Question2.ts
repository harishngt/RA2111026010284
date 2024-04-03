import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'; // Import your CSS file for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: 0,
    maxPrice: 10000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const fetchProducts = async () => {
    // Make API call to server based on filters
    const response = await fetch(/api/products?${new URLSearchParams(filters)});
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]); // Re-fetch on filter or page change

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSort = (field) => {
    // Implement sorting logic based on the field (price, rating, discount)
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="product-list">
      <div className="filters">
        {/* Form elements for filtering by category, company, price range */}
        <select name="category" onChange={handleFilterChange} value={filters.category}>
          <option value="">All Categories</option>
          {/* Populate options dynamically */}
        </select>
        <select name="company" onChange={handleFilterChange} value={filters.company}>
          <option value="">All Companies</option>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          {/* Add remaining companies */}
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          onChange={handleFilterChange}
          value={filters.minPrice}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleFilterChange}
          value={filters.maxPrice}
        />
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <