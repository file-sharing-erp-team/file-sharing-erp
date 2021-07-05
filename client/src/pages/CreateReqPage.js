import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Form, InputGroup } from 'bootstrap-4-react';
import { Button , Toast} from 'react-bootstrap'
import { Navig } from '../components/Navig';
import {useHttp} from '../context/hooks/http.hook'
import {useMessage} from '../context/hooks/message.hook'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'


export const CreateReqPage = () => {
    document.title = "FileSharing - Создать новый запрос"
    const {loading, error, request, clearError} = useHttp()
    const [show, setShow] = useState(false);
    const message = useMessage()
    const [form, setForm] = useState( {
        userId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        groupId: '',
        phoneNumber: ''
    })

    const [files, setFiles] = useState([])

    const changeHandler = event => {
        setForm({ ...form , [event.target.name]: event.target.value})
    }

    

    useEffect(() => {
        console.log("Error" + error)
        if(error !== null){
            toast(error)
        }
        
        //clearError()
    }, [error])

    const fileUpload = event => {
        console.log(event)
        setFiles(event.target.files)
    }

    const createReq = e => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('files', files)
        formData.append('data', form)

        console.log(formData)

        axios.post('/api/img/upload/users', formData)
        .then(res => {
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
        .catch(err => {
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }


    console.log(useParams().type)
    //Мат помощь
    if(useParams().type === '1'){
        return(
            <div>
                
                <header>
                    <Navig />
                </header>
                
                <div className="container mx-auto" style={{backgroundColor: "white", borderRadius: "5px", height:"85vh", overflow: "auto", marginTop: '2rem'}}>
                    <Form style={{marginTop: '1rem'}} onSubmit={createReq}>
                        <h3>Заявление на Материальную Поддержку</h3>
                        <br />
                        <InputGroup mb="3">
                            <InputGroup.PrependText>
                                Имя и Фамилия
                            </InputGroup.PrependText>
                            <Form.Input 
                            className="col" 
                            type="text" 
                            id="firstName"
                            name="firstName" 
                            placeholder="Введите имя..." 
                            onChange={changeHandler}
                            />
                            
                            <Form.Input 
                            className="col" 
                            type="text" 
                            id="lastName" 
                            placeholder="Введите фамилию..." 
                            name="lastName"
                            onChange={changeHandler}
                            />
                            
                        </InputGroup>
                        <Form.Group>
                            <label htmlFor="middleName">Отчество (при наличии)</label>
                                <Form.Input type="text" id="middleName" placeholder="Введите отчество..." name="middleName" onChange={changeHandler}/>
                            <br />
                            <label htmlFor="groupId">Группа</label>
                                <Form.Input type="text" id="groupId" placeholder="Группа..." name="groupId" onChange={changeHandler}/>
                            <br />
                            <label htmlFor="phoneNumber">Мобильный</label>
                            <InputGroup mb="2">
                                <InputGroup.PrependText>
                                    +7
                                </InputGroup.PrependText>
                                <Form.Input type="text" id="phoneNumber" placeholder="Номер мобильного телефона..." name="phoneNumber" onChange={changeHandler}/>
                                
                            </InputGroup>
                            
                        </Form.Group>
                        <Form.Group style={{color:'red'}}>
                            <p>Необходимые документы</p>
                            <ul>
                                <li>
                                    Трудовые книги родителей или опекунов
                                </li>
                                <li>
                                    Пенсионное удостоверение (при наличии)
                                </li>
                            </ul>
                        </Form.Group>
                        
                        <Form.Group >
                            <Form.Group >
                                <label htmlFor="files">Необходимые документы</label>
                                <Form.File id="files" multiple onChange={fileUpload}/>
                            </Form.Group>
                            <Form.Group >
                                <Button variant="primary" type="submit" className="col  align-self-center">
                                    Отправить
                                </Button>
                            </Form.Group>
                        </Form.Group>
                    </Form>
                   
                </div>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Уведомление</strong>
                            <small>File Sharing</small>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                </Toast>
            </div>
        )
    }

    return(
        <div>
            <h1>Ничего нет</h1>
        </div>
    )
}