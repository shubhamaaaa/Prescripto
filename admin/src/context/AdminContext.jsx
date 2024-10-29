import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const AdminContext = createContext()


const AdminContextProvider=(props)=>{
    const [aToken,setAtoken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    const backendUrl= import.meta.env.VITE_BACKEND_URL

    const getAllDoctors=async()=>{
        try {
            const {data}=await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}})
           if (data.success) {
            setDoctors(data.doctors)
            console.log(data.doctors)
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const changeAvailability=async(docId)=>{
        try {
            const {data}=await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
         try {
            const {data}=await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
            
         } catch (error) {
            toast.error(error.message)
            console.log(error) 
         }
    }


    const getDashData=async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error) 
        }
    }


    const value={
      aToken,setAtoken,backendUrl,doctors,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,
      dashData,getDashData

    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider