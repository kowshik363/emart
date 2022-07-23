import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
// import data from "../data";

//reducer hook
//reducer(current state, action)
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading: false};    
        case 'FETCH_FAIL':
            return {...state, error: action.payload, loading: false}; 
        default:
            return state;
    }
}

function HomeScreen() {

    //useReducer(reducer, default state)
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
        loading: true, 
        error: '', 
        products: [],
    });

    // state hook & useEffect hook
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            } catch (error) {
                dispatch({type:'FETCH_FAIL', payload: error.message});
            }
            //setProducts(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) : (
                    products.map(product=>(
                        <div className="product" key={product.slug}>
                            <Link to={`/product/${product.slug}`}>
                            <img className='product-img' src={product.image} alt={product.name}/>
                            </Link>
                            <div className="product-info">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>
                            <p><strong>{product.price}</strong></p>
                            <button>ADD TO CART</button>
                            </div>
                        </div>
                    ))
                )};
            </div>
        </div>
    )
}

export default HomeScreen;