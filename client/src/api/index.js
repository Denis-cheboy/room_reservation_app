import axios from "axios"
import { useEffect,useState } from "react"

const api=axios.create({
    baseURL:"http://localhost:3500/api"
})
const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setIsLoading(true)
                const res=await api.get(url)
                setData(res.data)
                setIsLoading(false)

            }
            catch(err){
                setIsLoading(false)
                setError(err)
            }
        }
        fetchData()
    },[url])

    const reFetch=async()=>{
        try{
            setIsLoading(true)
            const res=await api.get(url)
            setData(res.data)
            setIsLoading(false)

        }
        catch(err){
            setIsLoading(false)
            setError(err)
        }
    }

    return {data,isLoading,error,reFetch}

}

export default useFetch