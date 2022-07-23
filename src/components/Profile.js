import { Button, Typography, Box, Avatar, autocompleteClasses } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import React from "react";
import './Profile.css';
import telegram from '../img/telegram.png';
import avatar from '../img/avatar.png';
import close from '../img/close.png';
import { styled } from '@mui/material/styles';
import edit from '../img/edit.png';

function Profile({
    handleCloseProfile, name = "Михаил Чистяков", tags = ["#programmer", "#run", "#artist", "#extravert"],
    tgId = "@zoxal", about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
}) {

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

    const ConnectButton = styled(Button)({
        color: "#FFFFFF",
        backgroundColor: "#3050C1",
        '&:hover': {
            backgroundColor: "#3050C1",
        },
        borderRadius: 20,
        fontSize: 15,
        fontWeight: 200
    });

    return (
        <>
            <Box sx={profileBoxStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Avatar src={avatar} sx={{ width: 85, height: 85 }} />
                            <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{name}</Typography>
                                <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
                                    <img src={telegram} width={20} height={20} />
                                    <Typography>{tgId}</Typography>
                                </Box>
                                <ConnectButton variant="contained" onClick={handleCloseProfile}>Connect</ConnectButton>
                            </Box>
                        </Box>
                        <Button onClick={handleCloseProfile} variant="text">
                            <img src={close} width={25} height={25} />
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {tags.map(tag =>
                            <Typography sx={{ fontSize: 15, fontWeight: 15 }}>{tag}</Typography>)}
                        <img src={edit} width={20} height={20} />
                    </Box>
                    <Box className='about'>
                        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>О себе</Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 400 }}>{about}</Typography>
                    </Box>
                    <Box className='location'>
                        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Расположение</Typography>
                    </Box>
            </Box>
        </>
    );
}

export default Profile;
