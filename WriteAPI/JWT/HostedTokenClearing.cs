using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JWT
{
    public class HostedTokenClearing : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly IServiceScopeFactory serviceScopeFactory;
        public HostedTokenClearing(IServiceScopeFactory serviceScopeFactory)
        {
            this.serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            using (var scope = serviceScopeFactory.CreateScope())
            {
                var _jwtAuthManager = scope.ServiceProvider.GetService<IJwtAuthManager>();
                _jwtAuthManager.RemoveExpiredRefreshTokens(DateTime.Now).Wait();
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
