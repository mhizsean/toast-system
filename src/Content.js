import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAsync } from 'react-async';
import { fetchLikedFormSubmissions } from './service/mockServer';

export default function Content() {
  const {data, setData, isPending, error, run} = useAsync({
    deferFn: () =>
      fetchLikedFormSubmissions().then(data => data.formSubmissions),
  })

  useEffect(() => {
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  console.log(data, "like")
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      {isPending && <div>List loading...</div>}

      {data && (
          <div>
            {data.map(s => (
              <div key={s.id}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', marginTop: 1 }}>{s.data.firstName} {s.data.lastName}</Typography>
                <span>- {s.data.email} </span>
              </div>
            ))}
          </div>
        )}
    </Box>
  );
}
