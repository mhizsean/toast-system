import { Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { onMessage } from '../service/mockServer'
import CloseIcon from '@mui/icons-material/Close';

const SubmissionToast = () => {
  const [submissions, set] = useState([])

  useEffect(() => {
    onMessage (data => set(s => [...s, data]))
  }, [])

  const handleClose = id => {
    set(s => s.filter(submission => submission.id !== id))
  }

  return submissions.map(submission => (
    <Snackbar
      open
      key={submission.id}
      message={submission.data.email}
      onClose={() => handleClose(submission.id)}
      action={
          <CloseIcon/>
      }
    />
  ))
}

export default SubmissionToast