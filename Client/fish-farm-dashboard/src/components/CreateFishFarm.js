import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import {
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    FormFeedback,
    Button
} from 'reactstrap';
import { uploadImage } from '../services/imageUploadService';

const CreateFishFarm = ({ closeModal }) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState(null);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [numberOfCages, setNumberOfCages] = useState(0);
    const [barge, setBarge] = useState(false);
    const [image, setImage] = useState(null);

    const mutation = useMutation(fishFarm =>
        fetch('https://localhost:5001/FishFarm', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fishFarm),
        })
        , {
            onSuccess: () => {
                queryClient.invalidateQueries('fishFarms');
                closeModal();
            },
        });

    const handleImageChange = (imageFiles) => {
        setImage(imageFiles[0])
    }

    const handleUpload = async () => {
        try {
            const imageUrl = await uploadImage(image);
            return imageUrl;
        } catch (e) {
            console.error(e);
        }
    }

    const createFishFarm = async () => {
        const picture = await handleUpload();
        const newFishFarm = {
            name,
            longitude,
            latitude,
            numberOfCages,
            picture,
            barge
        }
        mutation.mutate(newFishFarm);
    }

    return (
        <Modal
            isOpen
            centered
            size="lg"
            backdrop
            toggle={() => closeModal()}
        >
            <ModalHeader>Register fish farm</ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                valid={name}
                                invalid={name !== null && !name}
                                type="text"
                                name="Name"
                                id="name"
                                placeholder={"Name"}
                            />
                            <FormFeedback id="firstNameNotValid">
                                {'Name is required!'}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input
                                onChange={(e) => setLongitude(e.target.value)}
                                type="number"
                                name="Longitude"
                                id="longitude"
                                placeholder={"Longitude"}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input
                                onChange={(e) => setLatitude(e.target.value)}
                                type="number"
                                name="Latitude"
                                id="latitude"
                                placeholder={"Latitude"}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input
                                onChange={(e) => setNumberOfCages(e.target.value)}
                                type="number"
                                name="NumberOfCages"
                                id="numberOfCages"
                                placeholder={"Number of cages"}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="ml-4">
                        <FormGroup>
                            <Input
                                onChange={(e) => setBarge(e.target.checked)}
                                type="checkbox"
                                name="terms"
                                id="termsCheckbox"
                                className="termsCheckbox"
                                placeholder={"Barge"}
                                checked={barge}
                            />
                            <span>Has barge</span>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "block" }}
                            onChange={(e) => handleImageChange(e.target.files)}
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" disabled={!name} onClick={() => createFishFarm()}>Create</Button>
                <Button color="secondary" onClick={() => closeModal()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
export default CreateFishFarm;

