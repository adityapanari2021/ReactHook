import React, { useState, useEffect, useCallback, useMemo, useReducer, useRef, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/*
Walkthrough - EcommerceProductListingDemo.jsx

This is a real-world e-commerce product listing component that demonstrates
how multiple hooks work together in a practical scenario.

Hooks Used:
- useState: Managing UI state (filters, sorting, view mode)
- useEffect: Fetching product data on component mount
- useCallback: Memoizing event handlers for filter/sort changes
- useMemo: Optimizing filtered and sorted products list
- useReducer: Managing complex cart state operations
- useRef: Storing search input reference and managing debounce timer
- useContext: Accessing theme from ThemeContext

Scenario: E-commerce product listing page with filtering, sorting, and shopping cart
*/

// Mock product data
const MOCK_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', rating: 4.5, stock: 10 },
  { id: 2, name: 'Headphones', price: 79, category: 'electronics', rating: 4.2, stock: 25 },
  { id: 3, name: 'T-Shirt', price: 19, category: 'clothing', rating: 4.0, stock: 50 },
  { id: 4, name: 'Jeans', price: 49, category: 'clothing', rating: 4.3, stock: 30 },
  { id: 5, name: 'Shoes', price: 89, category: 'footwear', rating: 4.6, stock: 15 },
  { id: 6, name: 'Watch', price: 199, category: 'accessories', rating: 4.4, stock: 20 },
  { id: 7, name: 'Phone', price: 699, category: 'electronics', rating: 4.7, stock: 8 },
  { id: 8, name: 'Sweater', price: 39, category: 'clothing', rating: 4.1, stock: 22 },
]

// Cart reducer function for complex state management
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id)
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
    
    case 'CLEAR_CART':
      return []
    
    default:
      return state
  }
}

export default function EcommerceProductListingDemo() {
  // Context: Get theme for styling
  const { theme } = useContext(ThemeContext)
  
  // useState: Managing products and filters
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name') // 'name', 'price-low', 'price-high', 'rating'
  const [searchTerm, setSearchTerm] = useState('')
  
  // useReducer: Managing complex cart state
  const [cart, dispatch] = useReducer(cartReducer, [])
  
  // useRef: Storing input reference and debounce timer
  const searchInputRef = useRef(null)
  const debounceTimerRef = useRef(null)
  
  // useEffect: Fetch products on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS)
      setLoading(false)
    }, 500) // Simulate API call
    
    return () => clearTimeout(timer)
  }, [])
  
  // useCallback: Memoize filter handler to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])
  
  // useCallback: Memoize sort handler
  const handleSortChange = useCallback((sort) => {
    setSortBy(sort)
  }, [])
  
  // useCallback: Debounced search handler
  const handleSearch = useCallback((value) => {
    setSearchTerm(value)
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    debounceTimerRef.current = setTimeout(() => {
      // Simulated search API call would go here
    }, 300)
  }, [])
  
  // useCallback: Add to cart handler
  const handleAddToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }, [])
  
  // useMemo: Optimize filtering and sorting (expensive calculation)
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })
    
    return sorted
  }, [products, selectedCategory, sortBy, searchTerm])
  
  // useMemo: Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])
  
  const bgColor = theme === 'light' ? '#f5f5f5' : '#2a2a2a'
  const textColor = theme === 'light' ? '#000' : '#fff'
  const borderColor = theme === 'light' ? '#ddd' : '#444'
  
  return (
    <div className="card" style={{ backgroundColor: bgColor, color: textColor, padding: '20px' }}>
      <h3>E-commerce Product Listing</h3>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: theme === 'light' ? '#fff' : '#444',
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '4px'
          }}
        />
      </div>
      
      {/* Category Filter */}
      <div style={{ marginBottom: '15px' }}>
        <strong>Filter by Category:</strong>
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
          {['all', 'electronics', 'clothing', 'footwear', 'accessories'].map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: '6px 12px',
                backgroundColor: selectedCategory === category ? '#007bff' : borderColor,
                color: selectedCategory === category ? '#fff' : textColor,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Sort Options */}
      <div style={{ marginBottom: '15px' }}>
        <strong>Sort by:</strong>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          style={{
            marginLeft: '10px',
            padding: '6px',
            backgroundColor: theme === 'light' ? '#fff' : '#444',
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '4px'
          }}
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>
      
      {/* Products Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <h4>Products ({filteredAndSortedProducts.length})</h4>
          {filteredAndSortedProducts.length === 0 ? (
            <p style={{ color: '#999' }}>No products found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {filteredAndSortedProducts.map(product => (
                <div
                  key={product.id}
                  style={{
                    border: `1px solid ${borderColor}`,
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: theme === 'light' ? '#fff' : '#333'
                  }}
                >
                  <h5 style={{ margin: '0 0 8px 0' }}>{product.name}</h5>
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>
                    💰 ${product.price} | ⭐ {product.rating} | Stock: {product.stock}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Shopping Cart Summary */}
      <div style={{ borderTop: `2px solid ${borderColor}`, paddingTop: '15px', marginTop: '20px' }}>
        <h4>Shopping Cart ({cart.length} items)</h4>
        {cart.length === 0 ? (
          <p style={{ color: '#999' }}>Cart is empty</p>
        ) : (
          <>
            <div style={{ marginBottom: '10px', maxHeight: '150px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    backgroundColor: theme === 'light' ? '#f9f9f9' : '#444',
                    marginBottom: '8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              paddingTop: '10px',
              borderTop: `1px solid ${borderColor}`
            }}>
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '10px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  )
}
