import SockJS from 'sockjs-client'
import { API_ROOT } from './constant'
import { Client } from '@stomp/stompjs'

let stompClient = null

export const connect = (onMessageReceived) => {
  const socket = new SockJS(`${API_ROOT}/ws`)
  stompClient = Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('Connected to socket')
      stompClient.subscribe('/topic/seats', (message) => {
        const seats = JSON.parse(message.body)
        onMessageReceived(seats)
      })
    },
    onDisconnect: () => {
      console.log('Disconnect')
    }
  })

  stompClient.activate()
}