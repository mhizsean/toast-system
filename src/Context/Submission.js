import React, { useEffect, useState, useRef } from 'react'
import { Snackbar, Button, IconButton, CircularProgress } from '@mui/material'
import { onMessage, saveLikedFormSubmission } from '../service/mockServer'
import CloseIcon from '@mui/icons-material/Close';
import { useAsync } from 'react-async'

const Toast = ({ onClose, submission, onLike}) => {
    const {
        isPending,
        status,
        run: saveSubmission
    } = useAsync({
        deferFn: args => saveLikedFormSubmission(...args),
        onResolve: onLike,
    })

    console.log(status, "ststya")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway' || isPending) return
        onClose()
      }
    
      const handleLike = () => {
        saveSubmission(submission)
      }

      const action = (
        <>
            {['initial', 'rejected'].includes(status) && (
                <Button
                    onClickCapture={handleLike}
                    color="secondary"
                    size="small"
                    onClick={handleClose}
                >
                    {status === 'rejected' ? 'RETRY' : 'LIKE'}
                </Button>
            )}
            
            {isPending ? (
                <CircularProgress />
            ) : (
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </>
      )

    const message = (
        <>
            <div>{submission.data.email}</div>
            <div>{submission.data.firstName}</div>
            <div>
                {status === "pending" && <>Loading</>}
                {status === "fulfilled" && <>Liked!</>}
                {status === "initial" && <>Like!</>}
                {status === "rejected" && <>Oops! Retry!</>}
            
             </div>
        </>
    )

    return (
        <Snackbar
            open
            autoHideDuration={isPending ? null : 5000}
            key={submission.id}
            message={message}
            onClose={handleClose}
            action={action}
        />
    )
}

const SubmissionToast = ({ onLike }) => {
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

    const handleClose = () => {
        setCurrent(submissions.current.shift() || null)
    }

    return (
        currentSubmission && (
            <Toast 
            onLike={onLike}
            key={currentSubmission.id}
            submission={currentSubmission}
            onClose={handleClose}
            />
        )
    )
}

export default SubmissionToast
