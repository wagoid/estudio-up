'use client'

import { TextField } from '@mui/material'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { FC, FormEvent } from 'react'

interface FormElements extends HTMLFormControlsCollection {
  query: HTMLInputElement
}

interface SearchFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export const RecordingsSearch: FC<{}> = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <form
      noValidate
      onSubmit={(event: FormEvent<SearchFormElement>) => {
        event.preventDefault()
        const query = event.currentTarget.elements.query.value

        router.replace(
          queryString.stringifyUrl({
            url: pathname,
            query: {
              ...Object.fromEntries(searchParams.entries()),
              query,
            },
          }),
        )
      }}
    >
      <TextField label="Pesquisar" name="query" id="query" size="small" />
    </form>
  )
}
