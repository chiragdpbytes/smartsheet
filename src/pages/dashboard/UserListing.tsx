import React, { useEffect, useState } from 'react'
import apiService from '../../api-config/services/Rap.service';
import { useToasts } from 'react-toast-notifications';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const UserListing = () => {
    const [data, setData] = useState<any[]>([{
        id: 1,
        name: 'a',
        image: 'A.jpg'
    }, {
        id: 2,
        name: 'b',
        image: 'B.jpg'
    }, {
        id: 3,
        name: 'c',
        image: 'C.jpg'
    }, {
        id: 4,
        name: 'd',
        image: 'D.jpg'
    }]);

    useEffect(() => {
        fetchData();
    }, []);

    const { addToast } = useToasts();
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedImage, setUpdatedImage] = useState<File | null>(null);

    const fetchData = async () => {
        // debugger;
        // try {
        //     const response = await apiService.get('/users/findAllRep');
        //     setData(response.data);
        //     console.log("response.data =>", response.data);
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
    };

    const handleDelete = async (id: number) => {
        setDeletingItemId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deletingItemId) {
            try {
                // Make API call to delete item
                // await apiService.delete(`/related-table-endpoint/${deletingItemId}`);

                // Remove the deleted item from the local state
                setData(data.filter(item => item.id !== deletingItemId));

                addToast('Item deleted successfully', { appearance: 'success', autoDismiss: true });
            } catch (error) {
                console.error('Error deleting item:', error);
                addToast('Error deleting item', { appearance: 'error', autoDismiss: true });
            } finally {
                setDeletingItemId(null); // Reset deletingItemId
            }
        }
    };

    const handleUpdate = (item: any) => {
        setSelectedItem(item);
        setUpdatedName(item.name); // Initialize input fields with existing data
        setIsUpdateModalOpen(true);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedName(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUpdatedImage(e.target.files[0]);
            console.log(updatedImage);
        }
    };

    const handleUpdateSubmit = async () => {
        if (selectedItem && updatedName !== '') {
            try {
                // Prepare form data for image upload (if provided)
                const formData = new FormData();
                formData.append('name', updatedName);
                if (updatedImage) {
                    formData.append('image', updatedImage.name);
                }

                // Make API call to update item
                // await apiService.put(`/related-table-endpoint/${selectedItem.id}`, formData);

                // Update the local state with the new data
                const updatedData = data.map(item =>
                    item.id === selectedItem.id ? { ...item, name: updatedName, image: updatedImage } : item
                );
                setData(updatedData);

                addToast('Item updated successfully', { appearance: 'success', autoDismiss: true });
                setIsUpdateModalOpen(false);
            } catch (error) {
                console.error('Error updating item:', error);
                addToast('Error updating item', { appearance: 'error', autoDismiss: true });
            }
        } else {
            addToast('Name field cannot be empty', { appearance: 'error', autoDismiss: true });
        }
    };

    return (
        <>
            <table className='custom-table'>
                {/* Render table headers */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* Render table rows with data */}
                <tbody>
                    {data.length ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <img src={item.image} alt={item.name} />
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(item)}>Update</button>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No user data found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            {deletingItemId !== null && (
                <>
                <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} center>
                    <div className="confirmation-modal">
                        <p>Are you sure you want to delete this record?</p>
                        <button onClick={() => setDeletingItemId(null)}>Cancel</button>
                        <button onClick={confirmDelete}>Confirm</button>
                    </div>
                </Modal>
                </>
            )}

            {/* Update Modal */}
            <Modal open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} center>
                <h2>Update Item</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={updatedName} onChange={handleNameChange} />
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" onChange={handleImageChange} />
                <button onClick={handleUpdateSubmit}>Update</button>
                <button onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
            </Modal>
        </>
    )
}

export default UserListing;
