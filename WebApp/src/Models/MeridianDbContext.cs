using Microsoft.Data.Entity;

namespace Meridian.Models
{
    public class MeridianDbContext : DbContext
    {
        public DbSet<Matter> Matters { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
