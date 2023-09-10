import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
 

function ProductModal({reCallToData}) {
    const [show, setShow] = useState(false);
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [productName, setProductName] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    
    const urls = []
    const MultipleImageUpload = () => images?.map((val) => {
        const MultipleImageRef = ref(storage, `/images/products/${productName}/${val.name}`);
        return uploadBytes(MultipleImageRef, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => { urls.push(url) }).catch((error) => alert(error));
        });
    })

    const AddProduct = (e) => {
        e.preventDefault();
        const uploadImages = MultipleImageUpload()
        Promise.all(uploadImages)
            .then(() => {
                const storageRef = ref(storage, `/images/products/${productName}/${thumbnail.name}`);
                uploadBytes(storageRef, thumbnail).then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            const payload = {
                                productName,
                                brand,
                                category,
                                price,
                                images: urls,
                                thumbnail: url,
                                description,
                                rating

                            }
                            

                            axios.post('http://localhost:1234/api/products', payload).then((json) => {
                                console.log(json.data);
                                setShow(false);
                                reCallToData(json.data.Product);
                                
                                
                                
                            })
                                .catch(err => console.log(err))

                        })
                        .catch((error) => { console.log(error) });
                });
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <Button className='bg-warning text-white btn btn-light' onClick={handleShow}>
                Add Product
            </Button>

            <Modal   show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>


                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="productName" label="Product Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="rating" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Product rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>

                        <div className="mb-3">

                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    images.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            onDoubleClick={() => setImages(images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}
                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                                    +
                                </label>
                            </div>


                            <input className="form-control d-none" onChange={(e) => setImages([...images, e.target.files[0]])} type="file" id="formFile" />
                        </div>


                        <div className="row">
                        <div className="col">
                                <FloatingLabel controlId="category" label="Category Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="brand" label="Brand Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Brand Name" value={brand} onChange={(e) => setBrand(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>





                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>





                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductModal;