import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';


function CategoryModal({reCallData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [CategoryName, setCategoryName] = useState("")
    const [CategoryImage, setCategoryImage] = useState(null)

    const AddCategory = (e) => {
        e.preventDefault();


        const storageRef = ref(storage, `images/${CategoryImage.name}`);

        uploadBytes(storageRef, CategoryImage).then((snapshot) => {

            getDownloadURL(snapshot.ref)
                .then((url) => {

                    const payload = {
                        CategoryName: CategoryName,
                        CategoryImage : url
                    }

                    axios.post('http://localhost:1234/api/categories', payload)
                    .then((json)=>{
                       setShow(false);
                       reCallData(json.data.categories);
                    })
                    .catch((err) => console.log(err.message));
                    
                })
                .catch((error) => console.log(error));


        });

 
    }

    return (
        <>
            <Button variant="bg-warning text-white btn btn-outline-light" onClick={handleShow}>
                Add Category
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddCategory}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                                Category Name
                            </label>
                            <input
                                value={CategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                aria-describedby="text"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input className="form-control" onChange={(e) => setCategoryImage(e.target.files[0])} type="file" id="formFile" />
                        </div>



                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default CategoryModal;

