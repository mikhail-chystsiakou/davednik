import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from "react";


function Profile({handleCloseProfile}) {

    const style = {
        position: 'absolute',
        top: '20%',
        right: '20%',
        width: 489,
        height: 632,
        backgroundColor: "#FFFFFF",
        p: 4,
    };

    return (
        <>
            <Box sx={style}>
                <Button onClick={handleCloseProfile} variant="text">Close</Button>
                Hello world
            </Box>
        </>
    );
}

export default Profile;
