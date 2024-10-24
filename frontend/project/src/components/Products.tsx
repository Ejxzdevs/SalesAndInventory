import { useEffect, useState } from "react";
import AddProduct from './modals/addProduct'; 

interface Product {
  product_id: number;
  product_name: string;
  category: string;
  price: number;
}

const Products = () => {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [isPopupVisible, setPopupVisible] = useState(false);

// for pop up modal
const closePopup = ()=> {
    setPopupVisible(false);
  }
const openPopup = () => {
    setPopupVisible(true);
  }

// execute fetch method once 
  useEffect(() => {
    fetchProducts();
  },[]);

// display products
const fetchProducts = async () => 
  {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/');
      if (!response.ok) throw new Error('Network response was not ok');
        const data: Product[] = await response.json();
          setProducts(data);
      }catch (error) {
        setError((error as Error).message);
      }finally {
        setLoading(false);
      }
  };

// delete product 
const deleteProduct = async (id: number)=> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/delete/${id}/`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    setProducts(prevProducts => prevProducts.filter(product => product.product_id !== id));
    }catch (error) {
      setError((error as Error).message);
    }finally {
      setLoading(false);
    }
}



  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
            <button onClick={openPopup} >open</button>
    <AddProduct trigger={isPopupVisible} onClose={closePopup} /> 
      <table className="w-3/4 border border-gray-300 shadow-lg">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Product Name</th>
            <th className="p-4 border-b">Category</th>
            <th className="p-4 border-b">Price</th>
            <th className="p-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id} className="hover:bg-gray-50">
              <td className="p-4 border-b text-center">{product.product_id}</td>
              <td className="p-4 border-b text-center">{product.product_name}</td>
              <td className="p-4 border-b text-center">{product.category}</td>
              <td className="p-4 border-b text-center">{product.price}</td>
              <td className="p-4 border-b text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 ml-2"
                onClick={ ()=> deleteProduct(product.product_id) }
                
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
