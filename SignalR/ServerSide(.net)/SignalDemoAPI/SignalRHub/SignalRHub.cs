using Microsoft.AspNetCore.SignalR;

namespace SignalDemoAPI.SignalRHub
{
    public class SignalRHub:Hub
    {
        //first method to call when Client connects.
        public override  Task OnConnectedAsync()
        {
            Console.WriteLine(Context.ConnectionId);   // Id  of Connected Client
            return base.OnConnectedAsync();
        }

        public override  Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task NewMessage(string msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }

    }
}
                                                                               