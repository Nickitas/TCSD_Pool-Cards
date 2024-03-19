import { useState, useEffect } from 'react'

const useAdminStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
        setIsAdmin(true);
    } else {
        setIsAdmin(false);
    }
  }, [])

    return isAdmin
}

export { useAdminStatus }