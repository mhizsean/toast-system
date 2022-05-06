import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAsync } from 'react-async';
import { fetchLikedFormSubmissions } from './service/mockServer';
import SubmissionToast from './Submission';
import { Button } from '@mui/material';

export default function Content() {
  const {data, setData, isPending, error, run} = useAsync({
    deferFn: () =>
      fetchLikedFormSubmissions().then(data => data.formSubmissions),
  })

  useEffect(() => {
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLike = submission => {
    if (data) setData([...data, submission])
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <>
        {isPending && <div>loading...</div>}
        {data && (
          <>
            {data.map(s => (
              <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 'bold', marginTop: 1 }} key={s.id}>
              - {s.data.email} |  {s.data.firstName}  
              </Typography>            
              ))}
          </>
        )}
        {error && (
          <div>
            {error.message}
            <Button onClick={run}>Retry</Button>
          </div>
        )}
      </>

        <SubmissionToast onLike={onLike} />
    </Box>
  );
}
