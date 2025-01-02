import { GroupOutlined } from "@mui/icons-material"
import { Avatar, Box, Stack, Typography } from "@mui/material"

const MenuBar = (props: any) => {
    const { members } = props
    return (
        <Stack className="menu-bar">
            <Stack className="room-info">
                <Avatar src="/img/icons/logo.png" sx={{ height: 70, width: 70 }} />
                <Typography fontSize={27} fontWeight={700}>CHATHUB</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={"10px"}>
                <GroupOutlined />
                <Box sx={{ fontWeight: "bold" }}>Members: {members.length}</Box>
            </Stack>
            <Stack className="members custom-scrollbar">
                {
                    members.map((ele: any) => {
                        return (
                            <Stack className="member">
                                <Avatar src="/img/icons/default-user.svg" />
                                <Box>
                                    {ele.memberNick}
                                </Box>
                            </Stack>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}

export default MenuBar