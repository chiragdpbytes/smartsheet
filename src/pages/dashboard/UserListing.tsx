import React, { useEffect, useRef, useState } from 'react'
import apiService from '../../api-config/services/Rap.service';
import { useToasts } from 'react-toast-notifications';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../../assets/icons/collection/EditIcon';
import { DeleteIcon } from '../../assets/icons/collection/DeleteIcon';
import { CloseIcon } from '../../assets/icons/collection/CloseIcon';
import { Skeleton } from '../../components/skeleton/Skeleton';
import { UploadIcon } from '../../assets/icons/collection/UploadIcon';
import { RefreshIcon } from '../../assets/icons/collection/RefreshIcon';
import PlaceholderImg from '../../assets/images/img-placeholder-img.png';
import CheckmarkImg from '../../assets/images/checkmark-transparent.gif';

const UserListing = () => {
    const [data, setData] = useState<any[]>([]);
    const logoutBtnRef = useRef<any>();
    const navigate = useNavigate();

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
    const [isImage, setIsImage] = useState<File | null>(null);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await apiService.get('/users/findAllRep', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id: number) => {
        setDeletingItemId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deletingItemId) {
            try {
                // Make API call to delete item
                const data: any = await apiService.delete(`/users/deleteImage/${deletingItemId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                if (data?.data?.statusCode === 200) {
                    fetchData()
                    addToast('Rep photo deleted successfully', { appearance: 'success', autoDismiss: true });
                }

                // Remove the deleted item from the local state

            } catch (error) {
                console.error('Error deleting item:', error);
                addToast('Error deleting photo', { appearance: 'error', autoDismiss: true });
            } finally {
                setDeletingItemId(null); // Reset deletingItemId
            }
        }
    };

    const handleUpdate = (item: any) => {
        setIsImage(null);
        setSelectedItem(item);
        setUpdatedName(item.name); // Initialize input fields with existing data
        setIsUpdateModalOpen(true);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedName(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // debugger
        if (e.target.files && e.target.files.length > 0) {
            setUpdatedImage(e.target.files[0]);
            setIsImage(e.target.files[0]);
        }
    };

    const handleUpdateSubmit = async () => {
        if (selectedItem && updatedName !== '') {
            try {
                // Prepare form data for image upload (if provided)
                const formData = new FormData();
                formData.append('name', updatedName);
                if (updatedImage) {
                    formData.append('file', updatedImage);
                }

                // Make API call to update item
                const data: any = await apiService.post(`/users/updateImage`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                if (data?.data?.statusCode === 200) {
                    fetchData();
                }

                addToast('Rep photo updated successfully', { appearance: 'success', autoDismiss: true });
                setIsUpdateModalOpen(false);
            } catch (error) {
                console.error('Error updating item:', error);
                addToast('Error updating item', { appearance: 'error', autoDismiss: true });
            }
        } else {
            addToast('Name field cannot be empty', { appearance: 'error', autoDismiss: true });
        }
    };

    const handleLogout = () => {
        navigate("/login");
        localStorage.clear();
    };

    return (
        <>
            <header>
                <h1 className='title'>Smartsheet </h1>

                <div className='btn-action'>
                    <Button
                        ref={logoutBtnRef}
                        onClick={() => fetchData()}
                        title="Refresh"
                        style="purple-dark"
                        icons={<RefreshIcon color='#ffffff' />}
                    />
                    <Button
                        ref={logoutBtnRef}
                        onClick={handleLogout}
                        title="Logout"
                        style="purple-light"
                        icons={<UploadIcon color='#8a6fab' size='16' />}
                    />
                </div>
            </header>
            <table className='custom-table'>
                {/* Render table headers */}
                <thead>
                    <tr>
                        <th>Rep Name</th>
                        <th>Rep Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* Render table rows with data */}
                <tbody>
                    {data?.length ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <div className='image'>
                                    {
                                        item.imageUrl ? (
                                            <img src={process.env.REACT_APP_API_URL + "/users/image/" + item.imageUrl} alt={item.name} />
                                        ) : (
                                            <img  crossOrigin='anonymous' src={PlaceholderImg} alt={item.name} height={56} width={72} />
                                        )
                                    }
                                    </div>
                                </td>
                                <td>
                                    <div className='actions'>
                                        <div onClick={() => handleUpdate(item)} title='Update Rep Photo'><EditIcon color='green' size='18' /></div>
                                        <div onClick={() => handleDelete(item._id)} title='Delete Rep Photo' className={`${!item.imageUrl ? 'disable' : ''}`}><DeleteIcon size='18' /></div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            {deletingItemId !== null && (
                <>
                    <Modal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        center
                        closeIcon={<CloseIcon />}
                        classNames={{
                            overlay: 'customOverlay',
                            modal: 'deletimg-popup',
                        }}
                    >
                        <h2 className="modal-title">Are you sure you want to delete Rep Photo?</h2>
                        <div className={`modal-body `}>
                            <div className='action-btn modal-action'>
                                <Button
                                    onClick={() => setDeletingItemId(null)}
                                    title='Cancel'
                                    style='gray-light'
                                />
                                <Button
                                    onClick={confirmDelete}
                                    title='Confirm'
                                    style='purple-dark'
                                />
                            </div>
                        </div>
                    </Modal>
                </>
            )}

            {/* Update Modal */}
            <Modal
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                center
                closeIcon={<CloseIcon />}
                classNames={{
                    overlay: 'customOverlay',
                    modal: '',
                }}
            >
                <h2 className="modal-title">Update Rep Photo</h2>
                <div className={`modal-body `}>
                    <div className='form-content'>
                        <div className={`form-control`}>
                            <label className="input-label" htmlFor="name">Rep Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Name"
                                // onChange={handleNameChange}
                                ref={null}
                                value={updatedName}
                                className={`common-input`}
                                disabled={true}
                            />
                        </div>
                        <div className="file-upload-wrapper">
                            <label className="input-label" htmlFor="image">Rep Photo</label>
                            <div className="file-upload-wrap">
                                <label>
                                    <div className="">
                                        {isImage ? (
                                            <img
                                            src={CheckmarkImg}
                                            alt="Image Uploaded"
                                            width="33"
                                            height="30"
                                            className="mb-4"
                                          />
                                        ) : <UploadIcon size='30' /> }
                                        <p className="label">{isImage ? updatedImage?.name : 'Drop Photo or a Click Here'}</p>
                                        {!isImage && <p className="label-note">Max Size 5 MB Only</p> }
                                    </div>

                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/jpg, image/png, image/jpeg"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='action-btn modal-action'>
                        <Button
                            onClick={() => setIsUpdateModalOpen(false)}
                            title='Cancel'
                            style='gray-light'
                        />
                        <Button
                            onClick={handleUpdateSubmit}
                            title='Update'
                            style='purple-dark'
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UserListing;
