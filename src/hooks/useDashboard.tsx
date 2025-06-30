import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDashboardSummary } from '../store/actions/dashboard.action'
import type { AppDispatch, RootState } from "../store/index"


interface DashboardDataType{
    totalUsers:number,
    totalCategories:number,
    totalSubcategories:number
}


const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, data, error } = useSelector((state:RootState) => state.dashboard)

  useEffect(() => {
   dispatch(fetchDashboardSummary())
  }, [dispatch])

  return { loading,data:data as DashboardDataType, error }
}

export default useDashboard
