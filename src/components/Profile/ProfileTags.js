import { Avatar, Box, Button, Chip, IconButton, Input, Typography } from '@mui/material';

export default function ProfileTags({tags, isMyProfile}) {

  return (
    <Box>
        {
          tags.split('#').slice(1).map(tag => {
            if (isMyProfile) {
              return <Chip label={"#" + tag} variant="outlined"
                onDelete={() => { console.log("todo") }}
                sx={{ margin: 1 }}
              />
            }
            return <Chip label={"#" + tag} variant="outlined"
              onClick={() => { }}
              sx={{ margin: 1 }}
            />
          })
        }
        </Box>
  )
}
