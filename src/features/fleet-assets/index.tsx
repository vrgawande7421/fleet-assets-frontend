import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import api from '@/services/api'
import { toast } from 'sonner'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { FleetAssetsDialogs } from './components/fleet-assets-dialogs'
import { FleetAssetsPrimaryButtons } from './components/fleet-assets-primary-buttons'
import { FleetAssetsProvider } from './components/fleet-assets-provider'
import { FleetAssetsTable } from './components/fleet-assets-table'
import { type FleetAsset } from './data/schema'

const route = getRouteApi('/_authenticated/fleet-assets/')

export function FleetAssets() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const [data, setData] = useState<FleetAsset[]>([])
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams()

        // Map table url state to backend API format
        if (search?.page) queryParams.append('page', String(search.page))
        if (search?.pageSize)
          queryParams.append('limit', String(search.pageSize))

        // Search param mapping
        if (search.search) queryParams.append('search', String(search.search))

        // Filter mapping - Handle array or string
        if (search.status)
          queryParams.append(
            'status',
            Array.isArray(search.status) ? search.status[0] : search.status
          )
        if (search.brand)
          queryParams.append(
            'brand',
            Array.isArray(search.brand) ? search.brand[0] : search.brand
          )
        const searchParams = search as Record<
          string,
          string | string[] | undefined
        >
        if (searchParams.assetType) {
          queryParams.append(
            'assetType',
            Array.isArray(searchParams.assetType)
              ? searchParams.assetType[0]
              : searchParams.assetType
          )
        }

        // Sorting mapping
        if (search.sort) {
          const sortField = search.sort.replace('-', '')
          const sortOrder = search.sort.startsWith('-') ? 'desc' : 'asc'
          queryParams.append('sort', sortField)
          queryParams.append('order', sortOrder)
        }

        const res = await api.get(`/fleet-assets?${queryParams.toString()}`)
        if (res.data.success) {
          setData(res.data.data)
          setTotalRecords(res.data.totalRecords)
        }
      } catch (_error) {
        toast.error('Failed to fetch fleet assets')
      }
    }

    fetchData()

    const handleRefresh = () => fetchData()
    window.addEventListener('refresh-assets', handleRefresh)
    return () => window.removeEventListener('refresh-assets', handleRefresh)
  }, [search])

  return (
    <FleetAssetsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Fleet Asset Master
            </h2>
            <p className='text-muted-foreground'>
              Manage your fleet assets and their specifications here.
            </p>
          </div>
          <FleetAssetsPrimaryButtons />
        </div>
        <FleetAssetsTable
          data={data}
          totalRecords={totalRecords}
          search={search}
          navigate={navigate}
        />
      </Main>

      <FleetAssetsDialogs />
    </FleetAssetsProvider>
  )
}
