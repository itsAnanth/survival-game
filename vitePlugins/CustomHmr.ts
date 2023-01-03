export default function CustomHmr() {
    return {
        name: 'custom-hmr',
        enforce: 'post',
        // HMR
        handleHotUpdate({ file, server }: { file: any, server: any }) {
            if (file.endsWith('.ts')) {
                console.log('reloading file');

                server.ws.send({
                    type: 'full-reload',
                    path: '*'
                });
            }
        },
    }
}