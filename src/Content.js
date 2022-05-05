import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAsync } from 'react-async';
import { fetchLikedFormSubmissions } from './service/mockServer';
import SubmissionToast from './Context/Submission';
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

  console.log(data, "like")
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 'bold', marginTop: 1 }}>
        {isPending && <div>loading...</div>}
        {data && (
          <>
            {data.map(s => (
              <div key={s.id}> - {s.data.email} |  {s.data.firstName}  </div>
            ))}
          </>
        )}
        {error && (
          <div>
            {error.message}
            <Button onClick={run}>Retry</Button>
          </div>
        )}
      </Typography>

        <SubmissionToast onLike={onLike} />
    </Box>
  );
}
