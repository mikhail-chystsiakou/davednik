import { Button, Typography, Box } from '@mui/material';
import React from "react";
import './Profile.css';


function Profile({ handleCloseProfile }) {

    const profileBoxStyle = {
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: 489,
        height: 632,
        backgroundColor: "#FFFFFF",
        p: 4,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5
    };

    return (
        <>
            <Box sx={profileBoxStyle}>
                <Box className='user'>
                    <Typography sx={{fontSize: 20, fontWeight: 600}}>Михаил Чистяков</Typography>
                    <Typography>@zoxal</Typography>
                    <Button onClick={handleCloseProfile} variant="text">Close</Button>
                </Box>
                <Box className='tags'>
                    <Typography sx={{fontSize: 15, fontWeight: 15}}>#programmer</Typography>
                    <Typography sx={{fontSize: 15, fontWeight: 15}}>#run</Typography>
                    <Typography sx={{fontSize: 15, fontWeight: 15}}>#artist</Typography>
                    <Typography sx={{fontSize: 15, fontWeight: 15}}>#extravert</Typography>
                </Box>
                <Box className='about'>
                    <Typography sx={{fontSize: 20, fontWeight: 600}}>О себе</Typography>
                    <Typography sx={{fontSize: 15, fontWeight: 400}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.</Typography>
                </Box>
                <Box className='location'>
                    <Typography sx={{fontSize: 20, fontWeight: 600}}>Расположение</Typography>
                </Box>
            </Box>
        </>
    );
}

export default Profile;
