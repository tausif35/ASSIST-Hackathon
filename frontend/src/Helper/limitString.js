export const limitString = (message,limit) => {
    var dots = "...";
    if (message.length > limit) {
        message = message.substring(0, limit) + dots;
    }

    return message;
}