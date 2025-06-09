import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDashboardSummary } from '../store/actions/dashboard.action'

const useDashboard = () => {
  const dispatch = useDispatch()
  const { loading, data, error } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardSummary())
  }, [dispatch])

  return { loading, data, error }
}

export default useDashboard
