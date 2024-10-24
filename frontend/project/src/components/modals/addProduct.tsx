import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './modal.css';

interface AddProductProps {
    trigger: boolean;
    onClose: () => void;
}

// Interface for the product data
interface Product {
    product_name: string;
    category: string;
    sku: string;
    description: string;
    price: number;
    cost: number;
    quantity_in_stock: number;
    image_url?: string;
}

const AddProduct: React.FC<AddProductProps> = ({ trigger, onClose }) => {
    const [product, setProduct] = useState<Product>({
        product_name: '',
        category: '',
        sku: '',
        description: '',
        price: 0,
        cost: 0,
        quantity_in_stock: 0,
    });

    const addProduct = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Network response was not ok: ${errorData}`);
            }

            const data = await response.json();
            console.log('Product added:', data);

            // clear the form or show a success message
            setProduct({
                product_name: '',
                category: '',
                sku: '',
                description: '',
                price: 0,
                cost: 0,
                quantity_in_stock: 0,
            });
            window.location.reload();

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const updatedValue = name === 'price' || name === 'cost' || name === 'quantity_in_stock'
            ? parseFloat(value) || 0 
            : value;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: updatedValue,
        }));
    };

    return trigger ? (
        <div className='modalContainer'>
            <div className='bg-slate-100 h-[500px] w-[500px] flex flex-col rounded-sm'>
                <div className='flex justify-end border-b-2'>
                    <button 
                        onClick={onClose} 
                        className="justify-center w-8 h-8 text-gray-500 hover:text-gray-800 focus:outline-none" 
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                    </button>
                </div>
                <div className='h-[93%] overflow-auto px-[3rem]'>
                    <h1 className='text-black font-bold py-5'>ADD PRODUCT</h1>
                    <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="product_name">Product Name</label>
                            <input 
                                id="product_name"
                                name="product_name"
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="text" 
                                placeholder='Enter product name' 
                                value={product.product_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="category">Category</label>
                            <input 
                                id="category"
                                name="category"
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="text" 
                                placeholder='Enter category' 
                                value={product.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="sku">Stock Keeping Unit</label>
                            <input 
                                id="sku"
                                name="sku"
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="text" 
                                placeholder='Enter SKU' 
                                value={product.sku}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description"
                                name="description"
                                className='border my-3 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[100px] overflow-y-auto' 
                                placeholder='Enter description' 
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="price">Price</label>
                            <input 
                                id="price"
                                name="price"
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="number" 
                                placeholder='Enter price' 
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="cost">Cost</label>
                            <input 
                                id="cost"
                                name="cost"
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="number" 
                                placeholder='Enter cost' 
                                value={product.cost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2'>
                            <label htmlFor="quantity_in_stock">Quantity</label>
                            <input 
                                id="quantity_in_stock"
                                name="quantity_in_stock" 
                                className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="number" 
                                placeholder='Enter quantity' 
                                value={product.quantity_in_stock}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col h-[18%] gap-2 p-[3rem]'>
                            <button 
                                type="submit"
                                className='bg-slate-400 hover:bg-slate-500 h-[35px] text-white rounded font-semibold tracking-wide'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
};

export default AddProduct;
