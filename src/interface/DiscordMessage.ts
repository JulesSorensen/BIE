interface DiscordMessage {
    guild: {
        id: number
    },
    author: {
        id: number
        discriminator: string,
        username: string
    },
    channel: {
        send: Function
    },
    content: string
}

export { DiscordMessage }