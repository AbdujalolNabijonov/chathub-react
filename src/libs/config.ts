export const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
export const Message = {
    error1: "Something went wrong!",
    error2: "Please, log in first!",
    error3: "Please, fulfill all inputs!",
    error4: "Message is empty!",
    error5: "Only images with jpeg, jpg, png, format allowed!",
    error6: "Password is not equal!",
    error7: "Password should be at least 6 characters",
    error8: "Current user is being used now!",
    error9: "Message is empty!"
}

export const API_URL = String(process.env.REACT_APP_API_URL)
export const TCP_URL = String(process.env.REACT_APP_TCP_URL)