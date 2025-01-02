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
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import MenuBar from './menuBar'

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

interface Message {
    id: number
    content: string
    sender: string
    timestamp: string
    image?: string
}

interface Contact {
    id: number
    name: string
    avatar: string
    lastMessage: string
    timestamp: string
    online?: boolean
}


const ChatMenu: React.FC = (props: any) => {
    const [activeChat, setActiveChat] = useState<string>("Steve Miller")
    const [text, setText] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const user = { _id: undefined }

    const messages: Message[] = [
        { id: 1, content: "Hello Peter, it's me, Steve", sender: "Steve Miller", timestamp: "11:04 am" },
        { id: 2, content: "Are you there? we need to talk, it's urgent", sender: "Steve Miller", timestamp: "11:05 am" },
        { id: 3, content: "Hey Steve, it's me. Are you looking for me now?", sender: "me", timestamp: "11:20 am" },
        { id: 4, content: "Could you come and talk to me? I'll send you the place", sender: "Steve Miller", timestamp: "11:35 am" },
        { id: 5, content: "Peter is typing...", sender: "status", timestamp: "11:40 am" },
    ]

    const members = [
        {memberNick:"Andy"},
        {memberNick:"Shawn"},
        {memberNick:"Martin"},
        {memberNick:"David"},
        {memberNick:"David"},
        {memberNick:"David"},
        {memberNick:"David"},
        {memberNick:"David"},
        {memberNick:"David"},
        {memberNick:"David"},
    ]

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
    return (
        <Stack className="container">
            <Stack className="chat-interface">
                < MenuBar members={members}/>
                <Stack className='chat-menu'>
                    <Box className={"client"}>
                        <Box className="client-wrapper"></Box>
                        <Box className={"client-info"} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ForumOutlined />
                            <Box>
                                <Typography variant="subtitle1">Room Name</Typography>
                                <Typography variant="caption" fontWeight={700}>Python</Typography>
                            </Box>
                        </Box>
                        <Box className={"client-sign"}>
                            <IconButton color="inherit" title='Log Out'>
                                <LogoutOutlined />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Messages */}
                    <Stack className={"msg-interface"}>
                        {messages.map((message: Message) => {
                            if (message.sender === "me") {
                                return (
                                    <Stack className={"sender"}>
                                        <Stack className='sender-msg'>
                                            <Box>{message.content}</Box>
                                            <Box className={"time"}>{message.timestamp}</Box>
                                        </Stack>
                                        <Avatar />
                                    </Stack>
                                )
                            } else {
                                return (
                                    <Stack className='messager'>
                                        <Avatar />
                                        <Stack className='messager-msg'>
                                            <Box>{message.content}</Box>
                                            <Box className={"time"}>{message.timestamp}</Box>
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