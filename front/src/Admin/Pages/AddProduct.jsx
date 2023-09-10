// import React, { useEffect, useState } from 'react'
// import ProductModal from '../Components/ProductModal'
// import axios from 'axios'
// import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
// import { AppRoute } from '../../App'

// export default function Products() {

//     const [Product, setProduct] = useState([])
//     useEffect(() => {
//         axios.get(`http://localhost:1234/api/allproducts`)
//             .then(json => setProduct(json.data.products))
//             .catch(err => console.log(err.message))
//     },[])


    
    
//     const deleteproduct = (_id) => {
//         axios.delete(`http://localhost:1234/api/deleteproduct/${_id}`)
//             .then(response => {
//                 console.log(response.data.products);
//                 setProduct(prevProduct => prevProduct.filter(Product => Product._id !== _id));
//             })
//             .catch(error => {
//                 console.error('Error deleting Product:', error);
//             });
//     };
    

   
//     return (
//         <div className="container">
//             <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
//                 <span className='fs-4 fw-bold text-white'>Products</span>
//                 <ProductModal reCallToData={setProduct} />
//             </div>

//             <div className="container">
//                 <table className="table align-middle">
//                     <thead>
//                         <tr>
//                             <th scope="col">Image</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Brand</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Actions</th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             Product?.map((val, key) =>
//                                 <tr key={key}>
//                                     <td><img src={val.thumbnail} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
//                                     <td>{val.productName}</td>
//                                     <td>{val.category}</td>
//                                     <td>{val.brand}</td>
//                                     <td>{val.price}</td>
//                                     <td>{val.description?.length < 20 ? val.description : val.description?.substring(0, 20) + "..."}</td>
//                                     <td className='d-flex justify-content-between'>
//                                         <button className="btn btn-dark" onClick={() => deleteproduct(val._id)}><AiOutlineDelete /></button>
                                      

//                                     </td>



//                                 </tr>)
//                         }



//                     </tbody>
//                 </table>

//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react'
import ProductModal from '../Components/ProductModal'
import axios from 'axios'
import { AiOutlineDelete } from 'react-icons/ai'
import { GoPencil } from 'react-icons/Go'

export default function Products() {
    const [Product, setProduct] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = () => {
        axios.get(`http://localhost:1234/api/allproducts`)
            .then((response) => setProduct(response.data.products))
            .catch((error) => console.log(error));
    }

    const deleteproduct = (_id) => {
        axios.delete(`http://localhost:1234/api/deleteproduct/${_id}`)
            .then(response => {
                console.log(response.data.products);
                setProduct(prevProduct => prevProduct.filter(Product => Product._id !== _id));
            })
            .catch(error => {
                console.error('Error deleting Product:', error);
            });
    };


    const updateProduct = (_id, newData) => {
        axios.put('http://localhost:1234/api/updateproduct', { _id, ...newData })
            .then(() => {
                fetchProduct();
                setSuccessMessage('Product updated successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000); // Display for 3 seconds
            })
            .catch((error) => {
                console.log('Axios Error:', error);
                console.log('Response Data:', error.response.data);
                console.log('Response Status:', error.response.status);
                console.log('Response Headers:', error.response.headers);
            });
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-warning p-2 p-2 my-3 rounded" >
                <span className='fs-4 fw-bold text-white'>Products</span>
                <ProductModal reCallToData={setProduct} />
            </div>

            <div className="container">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Product?.map((val, key) =>
                                <tr key={key}>
                                    <td><img src={val.thumbnail} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.productName}</td>
                                    <td>{val.category}</td>
                                    <td>{val.brand}</td>
                                    <td>{val.price}</td>
                                    <td>{val.description?.length < 20 ? val.description : val.description?.substring(0, 20) + "..."}</td>
                                    <td className='d-flex justify-content-between '>
                                        <button className="btn btn-light mx-1 " style={{ width: '50px' }} onClick={() => {
                                            const newCategoryName = prompt('Enter new Product Name:', val.title || val.productName);
                                            const newCategoryImage = prompt('Enter new Product Image URL:', val.thumbnail);
                                            const newProductCategory = prompt('Enter new Product category name:', val.category);
                                            const newProductBrand = prompt('Enter new Brand name:', val.brand);
                                            const newProductPrice = prompt('Enter new Price:', val.price);
                                            const newProductDes = prompt('Edit your Description:', val.description);
                                            if (newCategoryName && newCategoryImage && newProductCategory && newProductBrand && newProductPrice && newProductDes) {
                                                updateProduct(val._id, {
                                                    productName: newCategoryName,
                                                    thumbnail: newCategoryImage,
                                                    category: newProductCategory,
                                                    brand: newProductBrand,
                                                    price: newProductPrice,
                                                    description: newProductDes,
                                                });
                                            }
                                        }} >
                                           <GoPencil />
                                        </button>
                                        <button className="btn btn-dark" onClick={() => deleteproduct(val._id)}><AiOutlineDelete /></button>
                                    </td>



                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}