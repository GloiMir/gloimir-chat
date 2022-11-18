import React, { useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'
import user from '../assets/user.png'
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    //image upload
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const validationImg = (e) => {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert('max file size 1mb, fichier trop grand')
        }
        else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }
    const uploadImg = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'vstdprf5');
        try {
            setUploadingImg(true);
            let res = await fetch('https://api.cloudinary.com/v1_1/dut1lzqht/image/upload', {
                method: 'post',
                body: data
            })
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url
        } catch (err) {
            setUploadingImg(false);
            console.log(err);
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!image) return alert('Please upload your picture');
        const url = await uploadImg(image);
        console.log(url);
    }
    return (
        <Container>
            <Row>
                <Col md={5} className='d-flex align-items-center justify-content-center flex-direction-column'>
                    <Form className='form' onSubmit={handleSignup}>
                        <h2 className='titleSignup'>Créer un compte</h2>
                        <div className='signupProfileContainer'>
                            <img src={imagePreview || user} className='signupProfilPic' alt="" />
                            <label htmlFor='imageUpload' className='imageUploadLabel'>
                                <i className='fas fa-plus-circle addPictureIcon'></i>
                            </label>
                            <input type="file" id='imageUpload' hidden accept='image/jpeg, image/png' onChange={validationImg} />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Votre Nom</Form.Label>
                            <Form.Control type="text" placeholder="Votre Nom ici" required onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadingImg ? "Signing you up ..." : "Signup"}
                        </Button>
                        <div>
                            <p>
                                Vous avez déjà un compte? <Link to='/login'>Se connecter</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className='bgSignUp'></Col>
            </Row>
        </Container>
    );
}
export default SignUp