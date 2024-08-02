'use client'

import { TablePagination } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import { FC } from 'react'

export const RecordingsPagination: FC<{
  page: number
  totalResults: number
  pageSize: number
}> = ({ page, totalResults, pageSize }) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <TablePagination
      rowsPerPageOptions={[]}
      rowsPerPage={pageSize}
      page={page - 1}
      count={totalResults}
      onPageChange={(_event, page) => {
        router.replace(
          queryString.stringifyUrl({
            url: pathname,
            query: {
              page: page + 1,
            },
          }),
        )
      }}
    />
  )
}
