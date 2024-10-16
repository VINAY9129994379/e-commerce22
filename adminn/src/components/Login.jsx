import  { useState } from 'react'; // Add useState import
import './Login.css';
import { BackendUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login({setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BackendUrl + "api/user/admin", { email, password });
            
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message); 
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className='login'>
            <div className='login-container'>
                <h1>Admin Panel</h1>

                <form onSubmit={onSubmitHandler} className='form-container'>
                    <div className='form-email'>
                        <p>Email Address</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder='your email...'
                            required
                        />
                    </div>
                    <div className='form-password'>
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder='your password...'
                            required
                        />
                    </div>

                    <button className='form-btn' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
