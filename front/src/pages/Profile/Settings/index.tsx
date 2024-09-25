import { useState } from 'react';
import './index.css'
import {
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { IChangePwd, IError, ILogin } from '../../../lib/types';
import { handleChangeLog, handleChangePwd } from '../../../lib/api';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const SchemaPwd = yup.object({
    old: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long')
    .max(15, 'Password must be no more than fifteen'),
    newpwd: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long').
    max(15, 'Password must be no more than fifteen')
})

const SchemaLog = yup.object({
    password: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long').
    max(15, 'Password must be no more than fifteen'),
    login: yup.string().required('Please fill in the field')
    .min(6, 'Login must be at least six characters long').
    max(15, 'Login must be no more than fifteen')
})

export const Settings = () => {

    const [error, setError] = useState<IError>({
        forPwd: '',
        forLog: ''
    })

    const {register: registerPwd, handleSubmit: handleSubmitPwd, formState: {errors: errorsPwd}, reset: resetPwd} = useForm<IChangePwd>({
        resolver: yupResolver(SchemaPwd)
    })
    const {register: registerLog, handleSubmit: handleSubmitLog, formState: {errors: errorsLog}, reset: resetLog} = useForm<ILogin>({
        resolver: yupResolver(SchemaLog)
    })

    const onSubmitForPwd = (data: IChangePwd): void => {
        handleChangePwd(data)
        .then(response => {
            if(response.status == 'error' && response.message) {
                setError({...error, forPwd: response.message})
            }else {
                toast('Password changed')
                resetPwd()
                setError({...error, forPwd: ''})
            }
        })
    }

    const onSubmitForLog = (data: ILogin): void => {
        handleChangeLog(data)
        .then(response => {
            if(response.status == 'error' && response.message) {
                setError({...error, forLog: response.message})
            }else {
                toast('Login changed')
                resetLog()
                setError({...error, forLog: ''})
            }
        })
    }

    return (
        <div className="gradient-custom-2 settings" style={{ backgroundColor: '#9de2ff' }}>
            <div className='block'>
                <h2>Settings</h2>

                <div>
                    <h5>Change password</h5>
                            <form onSubmit={handleSubmitPwd(onSubmitForPwd)}>

                                {error && <p className='text-danger'>{error.forPwd}</p>}
                                {errorsPwd.old && <p className='text-danger'>{errorsPwd.old.message}</p>}
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='text'
                                    placeholder='Old password'
                                    {...registerPwd('old')}
                                />

                                {errorsPwd.newpwd && <p className='text-danger'>{errorsPwd.newpwd.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='text'
                                    placeholder='New password'
                                    {...registerPwd('newpwd')}
                                />

                                <button  type='submit' className='btn btn-outline-dark'>Change</button>
                            </form>
                </div>

                <div>
                    <h5>Change login</h5>
                            <form onSubmit={handleSubmitLog(onSubmitForLog)}>

                               {error && <p className='text-danger'>{error.forLog}</p>}
                               {errorsLog.password && <p className='text-danger'>{errorsLog.password.message}</p>}
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='text'
                                    placeholder='Password'
                                    {...registerLog('password')}
                                />

                                {errorsLog.login && <p className='text-danger'>{errorsLog.login.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='text'
                                    placeholder='New login'
                                    {...registerLog('login')}
                                />

                                <button  type='submit' className='btn btn-outline-dark'>Change</button>
                            </form>
                </div>

            </div>
        </div>
    )
}