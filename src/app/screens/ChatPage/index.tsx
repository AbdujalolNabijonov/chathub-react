import {
    Box,
    TextField,
    Avatar,
    Typography,
    IconButton,
    Paper,
    Badge,
    styled,
    Stack,
    Menu,
    MenuItem,
    Button
} from '@mui/material'
import { Phone, Person, Add, Send, AddReactionOutlined, LogoutOutlined, LoginOutlined, ForumOutlined, } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import MenuBar from './menuBar'
import { useGlobals } from '../../hooks/useGlobals'
import { useNavigate } from 'react-router-dom'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert'
import MemberService from '../../services/member.service'
import { useSocket } from '../../hooks/useSocket'
import { MessagePayload, MessagesPayload } from '../../../libs/types/chatMenu'
import moment from 'moment'
import { Member } from '../../../libs/types/member'
import { API_URL } from '../../../libs/config'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))


const ChatMenu: React.FC = (props: any) => {
    const [text, setText] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const [messages, setMessages] = useState<MessagePayload[]>([])
    const [members, setMembers] = useState<Member[]>([])

    const { authMember } = useGlobals()
    const navigate = useNavigate()
    const { socket, socketRoom, setUpdateSocket } = useSocket()

    //LifeCircle
    useEffect(() => {
        if (!authMember) navigate("/")
        setUpdateSocket(new Date())
    }, [])

    useEffect(() => {
        socket?.connect()

        socket?.emit("joinRoom", JSON.stringify(socketRoom))

        socket?.on('info', (data) => {
            console.log("info:", data)
        })

        socket?.on("getMessages", (data) => {
            const messages = JSON.parse(data)
            console.log(messages)
            setMessages(messages.list)
        })

        socket?.on("getMembers", (data) => {
            const membersFetch = JSON.parse(data);
            console.log(membersFetch)
            setMembers(membersFetch)
        })
    }, [socket])


    //Handler
    const handleText = (e: any) => {
        const text = e.target.value;
        setText(text)
    }
    const handleMenuToggle = (e: any) => {
        if (!anchorEl) {
            setAnchorEl(e.target)
        } else {
            setAnchorEl(null)
        }
    }

    const handleLogoutRequest = async () => {
        try {
            const memberService = new MemberService();
            await memberService.logout();
            await sweetTopSmallSuccessAlert("Success", 700);
            localStorage.removeItem("member");
            navigate("/")
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="container">
            <Stack className="chat-interface">
                < MenuBar members={members} />
                <Stack className='chat-menu'>
                    <Box className={"client"}>
                        <Box className="client-wrapper"></Box>
                        <Box className={"client-info"} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ForumOutlined />
                            <Box>
                                <Typography variant="subtitle1">Room Name</Typography>
                                <Typography variant="caption" fontWeight={700}>{socketRoom}</Typography>
                            </Box>
                        </Box>
                        <Box className={"client-sign"} onClick={handleLogoutRequest}>
                            <IconButton color="inherit" title='Log Out'>
                                <LogoutOutlined />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Messages */}
                    <Stack className={"msg-interface custom-scrollbar"}>
                        {messages.map((message: MessagePayload) => {
                            const image_url = `${API_URL}/${message.memberData.memberImage}`
                            if (message?.memberData?._id === authMember?._id) {
                                return (
                                    <Stack className={"sender"}>
                                        <Stack className='sender-msg'>
                                            <Box>{message.text}</Box>
                                            <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                        </Stack>
                                        <Avatar src={image_url}/>
                                    </Stack>
                                )
                            } else {
                                return (
                                    <Stack className='messager'>
                                        <Avatar src={image_url}/>
                                        <Stack className='messager-msg'>
                                            <Box>{message.text}</Box>
                                            <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                        </Stack>
                                    </Stack>
                                )
                            }
                        })}
                    </Stack>
                    {/* Message Input */}
                    <Box sx={{ p: 2, bgcolor: 'secondary.dark' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
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
                            <IconButton color="inherit" sx={{ color: 'white' }}>
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
            </Stack>
        </Stack>
    )
}

export default ChatMenu