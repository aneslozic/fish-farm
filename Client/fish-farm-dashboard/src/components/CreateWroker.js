import { useState } from "react";
import { history } from "../App";
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
    Button,
    Label
} from 'reactstrap';
import DatePicker from "react-datepicker";
import { uploadImage } from '../services/imageUploadService';

const CreateWorker = ({ closeModal, fishFarmId }) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState(null);
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [certifiedUntil, setCertifiedUntil] = useState(false);
    const [image, setImage] = useState(null);
    const [position, setPosition] = useState('');

    const mutation = useMutation(worker =>
        fetch('https://localhost:5001/Worker', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worker),
        })
        , {
            onSuccess: () => {
                queryClient.invalidateQueries('fishFarm');
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

    const createWorker = async () => {
        const picture = await handleUpload();
        const worker = {
            name,
            email,
            position,
            picture,
            fishFarmId,
            age,
            certifiedUntil
        }
        mutation.mutate(worker);
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
                                onChange={(e) => setAge(e.target.value)}
                                type="number"
                                name="Age"
                                id="age"
                                placeholder={"Age"}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="Email"
                                id="email"
                                placeholder={"Email"}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label className="mr-2">Choose date when certification will expire</Label>
                            <DatePicker
                                selected={certifiedUntil}
                                onChange={setCertifiedUntil}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Position</Label>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => setPosition(e.target.value)}>

                                <option>CEO</option>
                                <option>Worker</option>
                                <option>Capitan</option>
                            </Input>
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
                <Button color="primary" disabled={!name} onClick={() => createWorker()}>Create</Button>
                <Button color="secondary" onClick={() => closeModal()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
export default CreateWorker;

