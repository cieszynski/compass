const server = Bun.serve({
    hostname: process.env.HOST_NAME,
    port:  process.env.HOST_PORT,
    routes: {
        "/needle/*": { dir: "./needle" },
        "/rose/*": { dir: "./rose" },
        "/*": { dir: "./compass" },
    },
    fetch(req, server) {
        const username = "xxx";
        if (!server.upgrade(req, { data: { username } })) {
            return new Response("Not Found", { status: 404 });
        }
    },
    websocket: {
        data: {} as { username: string },
        open(ws) { 
            ws.subscribe("needle");
            console.log('open ws');
            ws.send('hallo')
        }, 
        close(ws, code, message) { 
            ws.unsubscribe("needle");
            console.log('close ws', code, message)
        },
        message(ws, message) {
            const data = JSON.parse(message.toString());

            switch(data.dest) {
                default:
                    server.publish(data.dest, data.msg)
            }
        },
        error(error, ws) { console.error(error)},
    },
});

console.log(`Server running at ${server.url}`);