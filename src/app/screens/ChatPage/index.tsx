import {
    Box,
    TextField,
    Avatar,
    Typography,
    IconButton,
    Stack,
    Menu,
} from '@mui/material'
import {  Send, AddReactionOutlined, LogoutOutlined, ForumOutlined, } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import MenuBar from './menuBar'
import { useGlobals } from '../../hooks/useGlobals'
import { useNavigate } from 'react-router-dom'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert'
import MemberService from '../../services/member.service'
import { useSocket } from '../../hooks/useSocket'
import { MessagePayload} from '../../../libs/types/chatMenu'
import moment from 'moment'
import { Member } from '../../../libs/types/member'
import { API_URL } from '../../../libs/config'
import useDeviceDetect from '../../hooks/useDeviceDetect'
import DashboardLayoutBasic from '../../../libs/components/chatPage/chatMobile'


const ChatMenu: React.FC = (props: any) => {
    const [text, setText] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const [messages, setMessages] = useState<MessagePayload[]>([])
    const [members, setMembers] = useState<Member[]>([])
    const chatRef = useRef<HTMLElement>()

    const { authMember } = useGlobals()
    const navigate = useNavigate()
    const { socket, socketRoom, setUpdateSocket, updateSocket } = useSocket()
    const device = useDeviceDetect()

    //LifeCircle
    useEffect(() => {
        if (!localStorage.getItem("member")) navigate("/")
        setUpdateSocket(new Date())
    }, [])

    useEffect(() => {
        socket?.connect()

        socket?.emit("joinRoom", JSON.stringify(socketRoom))

        socket?.on('info', (data) => {
            const infoMessage = JSON.parse(data)
            setMessages([...messages, infoMessage])
        })

        socket?.on("getMessages", (data) => {
            const messagesFetch = JSON.parse(data)
            setMessages(messagesFetch.list)
        })

        socket?.on("getMembers", (data) => {
            const membersFetch = JSON.parse(data);
            setMembers(membersFetch)
        })

        return () => {
            socket?.disconnect()
        }
    }, [socket, updateSocket]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current?.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])


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

    const handleRequestMessage = () => {
        socket?.emit("message", JSON.stringify({ text }))
        setText("")
    }

    const handleLogoutRequest = () => {
        try {
            console.log("triggred")
            const memberService = new MemberService();
            memberService.logout().then();
            sweetTopSmallSuccessAlert("Success", 700).then();
            localStorage.removeItem("member");
            navigate("/")
        } catch (err: any) {
            sweetErrorHandling(err).then()
        }
    }

    if (device === "desktop") {
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
                        <Box ref={chatRef} className={"msg-interface custom-scrollbar"}>
                            {messages.map((message: MessagePayload, index: number) => {
                                const image_url = `${API_URL}/${message?.memberData?.memberImage}`
                                if (message?.memberData?._id === authMember?._id) {
                                    return (
                                        <Stack className={"sender"} key={index}>
                                            <Stack className='sender-msg'>
                                                <Box>{message.text}</Box>
                                                <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                            </Stack>
                                            <Avatar src={image_url} alt='person'/>
                                        </Stack>
                                    )
                                } else if (message.event === "info") {
                                    return (
                                        <Stack className='info' key={index}>
                                            <Box>{message?.memberData?.memberNick} has {message?.action} in {moment(message.timer).format("HH:mm")}</Box>
                                        </Stack>
                                    )
                                } else {
                                    return (
                                        <Stack className='messager' key={index}>
                                            <Avatar src={image_url} alt='person'/>
                                            <Stack className='messager-msg'>
                                                <Box>{message.text}</Box>
                                                <Box className={"time"}>{moment(message.timer).format("HH:mm")}</Box>
                                            </Stack>
                                        </Stack>
                                    )
                                }
                            })}
                        </Box>
                        {/* Message Input */}
                        <Box sx={{ p: 2, bgcolor: 'secondary.dark' }}>
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
                </Stack>
            </Stack>
        )
    } else {
        return (
            <DashboardLayoutBasic
                members={members}
                messages={messages}
                handleText={handleText}
                handleRequestMessage={handleRequestMessage}
                handleLogoutRequest={handleLogoutRequest}
                text={text}
                setText={setText}
            />
        )
    }
}

export default ChatMenu