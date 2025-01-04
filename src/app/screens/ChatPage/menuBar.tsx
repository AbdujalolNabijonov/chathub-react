import { GroupOutlined } from "@mui/icons-material"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import { Member } from "../../../libs/types/member"
import { API_URL } from "../../../libs/config"
import { useGlobals } from "../../hooks/useGlobals"

const MenuBar = (props: any) => {
    const { members } = props;
    const { authMember } = useGlobals()

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
                    members.map((member: Member, index: number) => {
                        const image_url = `${API_URL}/${member.memberImage}`
                        const isMatch = member._id === authMember?._id
                        return (
                            <Stack
                                className="member"
                                sx={isMatch ? { backgroundColor: "rgb(194, 191, 191)" } : {}}
                                key={index}
                            >
                                <Avatar src={image_url} />
                                <Box>
                                    {member.memberNick}
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