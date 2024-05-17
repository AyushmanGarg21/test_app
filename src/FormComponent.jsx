import { useState } from 'react';
import './App.css'
import axios from 'axios';

/**/

const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: ''
    });

    const ReportData = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const sendDataToApi = () => {
        const data = [{
            name: formData.name,
            email: formData.email,
            ContactNo: formData.contactNo,
            Report_text: ReportData,
            TimeStamp: new Date().toISOString()
        }];

        axios.post(import.meta.env.VITE_API_URL, data, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then(response => {
                console.log('Data sent successfully:', response.data);
                setSubmitted(true);
            })
            .catch(error => {
                console.error('Error sending data:', error);
                setError(true);
            });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendDataToApi();
    };

    return (
        <div className="container">
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className='fields'>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className='fields'>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div  className='fields'>
                        <label>Contact No:</label>
                        <input 
                            type="text" 
                            name="contactNo" 
                            value={formData.contactNo} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    {error && <div className="error">An error occurred. Please try again later.</div>}
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div className="confirmation">Thank you for submitting the form!</div>
            )}
        </div>
    );
};

export default FormComponent;
