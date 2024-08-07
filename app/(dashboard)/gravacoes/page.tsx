import {
  Button,
  Container,
  IconButton,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import { DeleteRecordingButton } from './_components/DeleteRecordingButton'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { RecordingsPagination } from './_components/RecordingsPatination'
import { getRecordingsAction } from '@/lib/modules/recordings/recordings.actions'

type RecordingsPageProps = {
  searchParams: {
    page?: string
  }
}

export default async function RecordingsPage({
  searchParams,
}: RecordingsPageProps) {
  const page = Number.parseInt(searchParams.page ?? '1') || 1
  const pageSize = 25
  const {
    recordings,
    pagination: { totalResults },
  } = await getRecordingsAction({
    page,
    pageSize,
  })

  return (
    <Container component={Stack}>
      <Link href="/gravacoes/criar" legacyBehavior passHref>
        <Button variant="contained">Criar gravação</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings.map((recording) => (
              <TableRow key={recording.id}>
                <TableCell component="th" scope="row">
                  {recording.data.title.text}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0} justifyContent="flex-end">
                    <IconButton
                      component={Link}
                      href={`/gravacoes/${recording.id}`}
                      title="Visualizar"
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={`/gravacoes/${recording.id}/editar`}
                      title="Editar"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <DeleteRecordingButton id={recording.id} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <RecordingsPagination
                page={page}
                totalResults={totalResults}
                pageSize={pageSize}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}
