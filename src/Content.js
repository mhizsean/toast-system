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

  const onLike = submission => {
    if (data) setData([...data, submission])
  }

  console.log(onLike, "like")
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
    </Box>
  );
}
