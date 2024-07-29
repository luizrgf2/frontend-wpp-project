import { io, Socket } from "socket.io-client";

interface SocketClientInput {
    onQrCode: (qrCode: string) => void
    onChangeSessionState: (state: string) => void
}

export class SocketClient {
  private socket: Socket;

  constructor(private readonly input: SocketClientInput) {
    this.socket = io(import.meta.env.VITE_WEBSOCKET_URL);

    this.socket.on("connect", () => {
      alert('Conectado no webscoket!')
      console.log(`Connected to server with ID: ${this.socket.id}`);
    });

    this.socket.on("disconnect", () => {
      alert('Disconectado do webscoket!')
      console.log("Disconnected from server");
    });

    this.socket.on("message", (data: any) => {
      console.log("Message from server:", data);
    });

    this.socket.on('session.update', (data)=>{

        if(data.state) {
            this.input.onChangeSessionState(data.state)    
        }

        if(data.qr) {
            this.input.onQrCode(data.qr)
        }
    })
  }

  public sendMessage(message: string): void {
    this.socket.emit("message", message);
  }
}

