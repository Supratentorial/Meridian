using Microsoft.Data.Entity;

namespace Meridian.Models
{
    public class MeridianDbContext : DbContext
    {
        public DbSet<Matter> Matters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;");
        }
    }
}
