const serverConfig = {
    scheme : 'http',
    host : '127.0.0.1',
    port : '8282'
}

const serverAuthority = `${serverConfig.scheme}://${serverConfig.host}:${serverConfig.port}`
const PATH_LOGIN = '/login'
const PATH_LOGOUT = '/logout'

export default {
    serverConfig,
    serverAuthority,
    PATH_LOGIN,
    PATH_LOGOUT
}