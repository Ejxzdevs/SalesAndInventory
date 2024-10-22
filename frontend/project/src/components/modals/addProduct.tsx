import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './modal.css';

interface AddProductProps {
    trigger: boolean;
    onClose: () => void; // Add onClose prop
}

const AddProduct: React.FC<AddProductProps> = ({ trigger, onClose }) => {
    return trigger ? (
        <div className='modalContainer' >
            <div className='bg-slate-100 h-[500px] w-[500px] flex flex-col rounded-sm'>
                <div className='flex justify-end border-b-2'>
                    <button 
                    onClick={onClose} 
                    className="justify-center w-8 h-8 text-gray-500 hover:text-gray-800 focus:outline-none " 
                    aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                    </button>
                </div>
                <div className='h-[93%] overflow-auto px-[3rem]'>
                    <h1 className='text-black font-bold py-5'>ADD PRODUCT</h1>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Product Name</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Category</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Stock Keeping Unit</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description"
                                className='border my-3 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[100px] overflow-y-auto' 
                                placeholder='Enter description' 
                            />
                        </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Price</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Cost</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <label htmlFor="">Quantity</label>
                        <input className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='ss' />
                    </div>
                    <div className='flex flex-col h-[18%] gap-2'>
                        <button className='bg-slate-400  hover:bg-slate-500  h-[35px] text-white rounded font-semibold tracking-wide' >Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
    ) : null;
};

export default AddProduct;
