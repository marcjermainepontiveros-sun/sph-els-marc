import Footer from '../../components/Footer'
import CategoryService from '../../services/category.service'
import { useState, useEffect } from 'react'
import CategoriesTable from '../../components/elements/CategoriesTable'
import AdminSection from '../../components/elements/AdminSection'

const AdminPage = () => {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)
      try {
        const response = await CategoryService.getCategoriesByPage(page)
        setLessons(response.data.results)
        setNextPage(response.data.next)
        setPreviousPage(response.data.previous)
        setCount(response.data.count)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchLessons()
  }, [page, count])

  return (
    <>
      <AdminSection />
      {(!error || !loading) && (
        <CategoriesTable
          lessons={lessons}
          count={count}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
          setCount={setCount}
          setPage={setPage}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
        />
      )}
      <Footer />
    </>
  )
}

export default AdminPage