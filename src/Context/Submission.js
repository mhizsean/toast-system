import { Snackbar, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { onMessage } from '../service/mockServer'
import CloseIcon from '@mui/icons-material/Close';

const SubmissionToast = () => {
    const submissions = useRef([])
    const [currentSubmission, setCurrent] = useState(null)

  useEffect(() => {
    onMessage(data => {
        setCurrent(current => {
          if (current) {
            submissions.current.push(data)
          }
          return current ? current : data
        })
      })
  }, [])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setCurrent(submissions.current.shift() || null)
  }

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        LIKE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    currentSubmission && (
        <Snackbar
        open
        autoHideDuration={5000}
        key={currentSubmission.id}
        message={currentSubmission.data.email}
        onClose={handleClose}
        action={action}
      />
    )
  
 )
  
}

export default SubmissionToast
