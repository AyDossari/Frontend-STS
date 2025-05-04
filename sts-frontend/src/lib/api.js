import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL

function setTokens({ access, refresh }) {

    if (access) localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
        const response = await axios.post(
            `${baseUrl}/token/refresh/`,
            { refresh: refreshToken }
        )
        setTokens({ access: response.data.access })
        console.log('access token has been refreshed')
    }
}

export { setTokens, refreshAccessToken }