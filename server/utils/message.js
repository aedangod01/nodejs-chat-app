export function generateMessage(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}