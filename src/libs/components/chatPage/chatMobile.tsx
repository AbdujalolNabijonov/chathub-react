import { useEffect, useRef, useState } from 'react';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Member } from '../../types/member';
import { Avatar, Box, IconButton, Menu, Stack, TextField } from '@mui/material';
import { API_URL } from '../../config';
import { MessagePayload } from '../../types/chatMenu';
import { useGlobals } from '../../../app/hooks/useGlobals';
import { AddReactionOutlined, LogoutOutlined, Send } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import { useSocket } from '../../../app/hooks/useSocket';

interface DashBoardInterface {
    members: Member[],
    messages: MessagePayload[],
    handleText: any,
    handleRequestMessage: any
    handleLogoutRequest: any
    text: string;
    setText: any
}

export default function DashboardLayoutBasic(props: DashBoardInterface) {
    const { members, messages, handleText, handleRequestMessage, handleLogoutRequest, text, setText } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const chatRef = useRef<HTMLElement>()
    const { authMember } = useGlobals()
    const {socketRoom}=useSocket()
    //LifeCircle

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current?.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])

    //Handlers
    const handleMenuToggle = (e: any) => {
        if (!anchorEl) {
            setAnchorEl(e.target)
        } else {
            setAnchorEl(null)
        }
    }
    const NAVIGATION: Navigation = [
        {
            kind: "page",
            title: `Room Chat: ${socketRoom}`,
        },
        {
            kind: 'header',
            title: `Joined Members: ${members.length}`,
        }
    ];
    members.forEach((member: Member) => {
        const image_url = member?.memberImage ? `${API_URL}/${member.memberImage}` : '';
        const memberInfo = {
            segment: 'member',
            title: member.memberNick,
            icon: <Avatar src={image_url} />,
        };

        NAVIGATION.push(memberInfo);
        NAVIGATION.push({ kind: 'divider' });
    });

    return (
        <AppProvider navigation={NAVIGATION}>
            <DashboardLayout
                slots={{
                    toolbarActions: () => {
                        return (
                            <Box className={"client-sign"} onClick={handleLogoutRequest}>
                                <IconButton color="inherit" title='Log Out'>
                                    <LogoutOutlined />
                                </IconButton>
                            </Box>
                        )
                    }
                }}
                branding={{
                    logo: (<img src="/img/icons/logo.png" alt='person' />),
                    title: "ChatHub"
                }}
            >
                <Stack className={"dashboard-interface"}>
                    <Box ref={chatRef} className={"msg-interface custom-scrollbar"}>
                        {messages.map((message: MessagePayload, index: number) => {
                            const image_url = message?.memberData?.memberImage ? `${API_URL}/${message?.memberData?.memberImage}` : "img/icons/default-user.svg"
                            if (message?.memberData?._id === authMember?._id) {
                                return (
                                    <Stack className={"sender"} key={index}>
                                        <Stack className='sender-msg'>
                                            <Box className={"owner-msg"}>{message?.memberData?.memberNick}</Box>
                                            <Box className={"text-msg"}>{message.text}</Box>
                                            <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                        </Stack>
                                        <Avatar src={image_url} alt='person' />
                                    </Stack>
                                )
                            } else {
                                return (
                                    <Stack className='messager' key={index}>
                                        <Avatar src={image_url} alt='person' />
                                        <Stack className='messager-msg'>
                                            <Box className={"owner-msg"}>{message?.memberData?.memberNick}</Box>
                                            <Box className={"text-msg"}>{message.text}</Box>
                                            <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                        </Stack>
                                    </Stack>
                                )
                            }
                        })}
                    </Box>
                    <Box className={"sender-input"} sx={{ p: 2, bgcolor: 'secondary.dark' }}>
                        <Box sx={{ display: 'flex', gap: 1 }} >
                            <IconButton color="inherit" sx={{ color: 'white' }} onClick={handleMenuToggle}>
                                <AddReactionOutlined />
                            </IconButton>
                            <TextField
                                fullWidth
                                placeholder="Type a message..."
                                variant="outlined"
                                size="small"
                                onChange={handleText}
                                value={text}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.2)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255,255,255,0.3)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'rgba(255,255,255,0.5)',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255,255,255,0.6)',
                                    },
                                }}
                            />
                            <IconButton
                                color="inherit"
                                sx={{ color: 'white' }}
                                onClick={handleRequestMessage}
                            >
                                <Send />
                            </IconButton>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            onClose={handleMenuToggle}
                            open={Boolean(anchorEl)}
                        >
                            <EmojiPicker
                                onEmojiClick={(emojiObj) => {
                                    setText(text + emojiObj.emoji)
                                    setAnchorEl(null)
                                }}
                            />
                        </Menu>
                    </Box>
                </Stack>
            </DashboardLayout>
        </AppProvider>
    );
}
