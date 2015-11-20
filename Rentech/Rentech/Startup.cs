using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Rentech.Startup))]
namespace Rentech
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
