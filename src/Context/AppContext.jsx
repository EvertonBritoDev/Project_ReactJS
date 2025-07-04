import { createContext,useState,useEffect, Children } from "react";
import {getApiData} from '../Services/apiServices.js'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const savedLanguage = localStorage.getItem('lang')
    const [language, setLanguage] = useState(savedLanguage ?? 'br')
    const [languages, setLanguages] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        const fetchLanguages = async () => { 
            try { 
                const getTexts = await getApiData('webText')
                setLanguages(getTexts)
            } 
            catch (error) {     
                console.error(error)
            } 
            finally { 
                setLoading(false)
            }
        }   
        fetchLanguages();
    }, [])

    useEffect(() => {
        localStorage.setItem('lang',language)
    },[language])
    
    return (
        <AppContext.Provider value={{language,languages,setLanguage,loading}}>
            {children}
        </AppContext.Provider>

    )

}

