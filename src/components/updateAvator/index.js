import { Button, Modal, Upload, message } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { auth, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux'
import axios from 'axios';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function UpdateAvator() {
    const { currentUser } = useSelector((state) => state.user)
    const [openChangeAvatorModal, setOpenChangeAvatorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [currentFile, setCurrentFile] = useState()
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            console.log('no');
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            console.log('yes');
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const showAvatorChangeModal = () => {
        setOpenChangeAvatorModal(true);
    };
    const handleOk = () => {
        setOpenChangeAvatorModal(false);
    };
    const handleCancel = () => {
        setOpenChangeAvatorModal(false);
    };
    const submitToFireBase = () => {

        if (currentFile) {
            const file = currentFile
            const storageRef = ref(storage, `${currentUser.name}-avatar`);//need to do

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await axios.put(`http://localhost:3001/api/users/${currentUser._id}`, {
                            avator: downloadURL,
                        })
                    });
                }
            );
        } else {
            message.err('Some error happens')
        }
    }

    return (
        <>
            <Button onClick={showAvatorChangeModal}>Change Avatar</Button>
            <Modal
                open={openChangeAvatorModal}
                title="Change Avator"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <>
                    <input onChange={(e) => { setCurrentFile(e.target.files[0]) }} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple />
                    <Button onClick={() => { submitToFireBase() }}>OK</Button>
                </>
            </Modal>
        </>
    )
}
