import { Button, Modal, Upload, message } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { auth, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'

export default function UpdateAvator() {
    const { currentUser } = useSelector((state) => state.user)
    const [openChangeAvatorModal, setOpenChangeAvatorModal] = useState(false);

    const [currentFile, setCurrentFile] = useState()
    const dispatch = useDispatch()
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
                        dispatch(loginStart())
                        await axios.put(`http://localhost:3001/api/users/${currentUser._id}`, {
                            avator: downloadURL,
                        }, { withCredentials: true }).then((res) => {
                            dispatch(loginSuccess(res.data))
                            handleOk()
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
                    <input onChange={(e) => { console.log(e.target.files[0]); setCurrentFile(e.target.files[0]) }} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple />
                    <Button onClick={() => { submitToFireBase() }}>OK</Button>
                </>
            </Modal>
        </>
    )
}
